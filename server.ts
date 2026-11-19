import 'dotenv/config';
import express from 'express';
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { GoogleGenAI, ThinkingLevel, Type } from '@google/genai';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const isProduction = process.env.NODE_ENV === 'production';

// In-memory translation cache per language key
const translationCache = new Map<string, unknown>();

function getGeminiClient(): GoogleGenAI | null {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey || apiKey === 'MY_GEMINI_API_KEY') {
    return null;
  }
  return new GoogleGenAI({
    apiKey,
    httpOptions: {
      headers: {
        'User-Agent': 'aistudio-build',
      },
    },
  });
}

const translationResponseSchema = {
  type: Type.OBJECT,
  properties: {
    languageNativeName: { type: Type.STRING },
    isRtl: { type: Type.BOOLEAN },
    nav: {
      type: Type.OBJECT,
      properties: {
        overview: { type: Type.STRING },
        services: { type: Type.STRING },
        brochure: { type: Type.STRING },
        contact: { type: Type.STRING },
        viewBrochure: { type: Type.STRING },
      },
      required: ['overview', 'services', 'brochure', 'contact', 'viewBrochure'],
    },
    controls: {
      type: Type.OBJECT,
      properties: {
        languageLabel: { type: Type.STRING },
        allWorldLanguages: { type: Type.STRING },
        recipientView: { type: Type.STRING },
        recipientBannerTitle: { type: Type.STRING },
        recipientBannerSubtitle: { type: Type.STRING },
        exitRecipientView: { type: Type.STRING },
        copyShareLink: { type: Type.STRING },
        linkCopied: { type: Type.STRING },
        keepOriginalInline: { type: Type.STRING },
        originalContentNote: { type: Type.STRING },
      },
      required: [
        'languageLabel',
        'allWorldLanguages',
        'recipientView',
        'recipientBannerTitle',
        'recipientBannerSubtitle',
        'exitRecipientView',
        'copyShareLink',
        'linkCopied',
        'keepOriginalInline',
        'originalContentNote',
      ],
    },
    hero: {
      type: Type.OBJECT,
      properties: {
        subtitle: { type: Type.STRING },
        headline: { type: Type.STRING },
        description: { type: Type.STRING },
        primaryCta: { type: Type.STRING },
        callNow: { type: Type.STRING },
        emailUs: { type: Type.STRING },
        zoomSchematic: { type: Type.STRING },
        schematicCaption: { type: Type.STRING },
      },
      required: [
        'subtitle',
        'headline',
        'description',
        'primaryCta',
        'callNow',
        'emailUs',
        'zoomSchematic',
        'schematicCaption',
      ],
    },
    credentials: {
      type: Type.OBJECT,
      properties: {
        udyamLabel: { type: Type.STRING },
        addressLabel: { type: Type.STRING },
        addressTranslated: { type: Type.STRING },
        mobileLabel: { type: Type.STRING },
        emailLabel: { type: Type.STRING },
      },
      required: ['udyamLabel', 'addressLabel', 'addressTranslated', 'mobileLabel', 'emailLabel'],
    },
    servicesSection: {
      type: Type.OBJECT,
      properties: {
        heading: { type: Type.STRING },
        subheading: { type: Type.STRING },
        filterAll: { type: Type.STRING },
        filterConcrete: { type: Type.STRING },
        filterDrainage: { type: Type.STRING },
        filterEarthwork: { type: Type.STRING },
        zoomInLabel: { type: Type.STRING },
        scopeLabel: { type: Type.STRING },
        originalTermLabel: { type: Type.STRING },
      },
      required: [
        'heading',
        'subheading',
        'filterAll',
        'filterConcrete',
        'filterDrainage',
        'filterEarthwork',
        'zoomInLabel',
        'scopeLabel',
        'originalTermLabel',
      ],
    },
    services: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          id: { type: Type.STRING },
          title: { type: Type.STRING },
          categoryLabel: { type: Type.STRING },
          summary: { type: Type.STRING },
          technicalSpecs: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
          },
        },
        required: ['id', 'title', 'categoryLabel', 'summary', 'technicalSpecs'],
      },
    },
    brochureSection: {
      type: Type.OBJECT,
      properties: {
        heading: { type: Type.STRING },
        subheading: { type: Type.STRING },
        downloadPdf: { type: Type.STRING },
        downloadingPdf: { type: Type.STRING },
        printPdf: { type: Type.STRING },
        fitScreen: { type: Type.STRING },
        zoomLabel: { type: Type.STRING },
        page1Tag: { type: Type.STRING },
        page2Tag: { type: Type.STRING },
        companyProfileTitle: { type: Type.STRING },
        companyProfileBody: { type: Type.STRING },
        coreCapabilitiesTitle: { type: Type.STRING },
        serviceCatalogueTitle: { type: Type.STRING },
        officialDeclaration: { type: Type.STRING },
      },
      required: [
        'heading',
        'subheading',
        'downloadPdf',
        'downloadingPdf',
        'printPdf',
        'fitScreen',
        'zoomLabel',
        'page1Tag',
        'page2Tag',
        'companyProfileTitle',
        'companyProfileBody',
        'coreCapabilitiesTitle',
        'serviceCatalogueTitle',
        'officialDeclaration',
      ],
    },
    contactSection: {
      type: Type.OBJECT,
      properties: {
        heading: { type: Type.STRING },
        subheading: { type: Type.STRING },
        directReachTitle: { type: Type.STRING },
        officeAddressTitle: { type: Type.STRING },
        originalAddressNote: { type: Type.STRING },
        inquiryTitle: { type: Type.STRING },
        namePlaceholder: { type: Type.STRING },
        phonePlaceholder: { type: Type.STRING },
        workTypePlaceholder: { type: Type.STRING },
        messagePlaceholder: { type: Type.STRING },
        sendViaEmail: { type: Type.STRING },
        callDirect: { type: Type.STRING },
        footerNotice: { type: Type.STRING },
      },
      required: [
        'heading',
        'subheading',
        'directReachTitle',
        'officeAddressTitle',
        'originalAddressNote',
        'inquiryTitle',
        'namePlaceholder',
        'phonePlaceholder',
        'workTypePlaceholder',
        'messagePlaceholder',
        'sendViaEmail',
        'callDirect',
        'footerNotice',
      ],
    },
  },
  required: [
    'languageNativeName',
    'isRtl',
    'nav',
    'controls',
    'hero',
    'credentials',
    'servicesSection',
    'services',
    'brochureSection',
    'contactSection',
  ],
};

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  app.post('/api/translate', async (req, res) => {
    try {
      const targetLanguage = String(req.body?.targetLanguage || '').trim();
      const sourceContent = req.body?.sourceContent;

      if (!targetLanguage || !sourceContent) {
        return res.status(400).json({ error: 'targetLanguage and sourceContent are required.' });
      }

      const cacheKey = targetLanguage.toLowerCase();
      if (translationCache.has(cacheKey)) {
        return res.json({
          translation: translationCache.get(cacheKey),
          cached: true,
        });
      }

      const ai = getGeminiClient();
      if (!ai) {
        return res.status(503).json({
          error:
            'Translation service is not configured. Please ensure GEMINI_API_KEY is set in Settings > Secrets.',
        });
      }

      const systemInstruction = `You are a precision technical translator for a civil engineering and construction company.
Translate the provided English JSON content accurately into the target language: "${targetLanguage}".

STRICT RULES:
1. Keep the exact JSON structure and preserve all "id" values in the "services" array ("rcc", "pcc", "sub_drain", "toe_wall", "culvert_box", "mitti_dressing", "soil_cutting").
2. Keep official brand identifiers, registration numbers, phone numbers, and email addresses untouched whenever referenced:
   - Brand: POWER रुद्रा ॐ कुंडा (POWER RUDRA KUNDA)
   - Registration: UDYAM-HR-06-0096289
   - Phone: 9813559915
   - Email: ishwarkunda311@gmail.com
3. Translate "addressTranslated" accurately into "${targetLanguage}" from "Village & Post - Gaibipur, Tehsil - Barwala, District - Hisar (Haryana) - 125121".
4. Use authentic civil engineering and earthwork terminology in "${targetLanguage}" for RCC, PCC, Sub Drain, Toe Wall, Culvert Box, Raw Soil Dressing (कच्ची मिट्टी की ड्रेसिंग), and Soil Cutting.
5. Set "isRtl" to true ONLY if "${targetLanguage}" is written right-to-left (such as Arabic, Urdu, Persian, Hebrew, Pashto, Sindhi). Otherwise set "isRtl" to false.
6. Set "languageNativeName" to the natural name of "${targetLanguage}" written in its own script (e.g. "Español", "العربية", "日本語", "मराठी", "Français").
7. NEVER include any bank account details or PAN numbers.`;

      const response = await ai.models.generateContent({
        model: 'gemini-4-hydrogen',
        contents: JSON.stringify(sourceContent),
        config: {
          systemInstruction,
          responseMimeType: 'application/json',
          responseSchema: translationResponseSchema,
          thinkingConfig: { thinkingLevel: ThinkingLevel.LOW },
        },
      });

      const rawText = response.text?.trim();
      if (!rawText) {
        return res.status(502).json({ error: 'Empty response from translation service.' });
      }

      const parsed = JSON.parse(rawText);
      translationCache.set(cacheKey, parsed);

      return res.json({ translation: parsed, cached: false });
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Translation failed.';
      console.error('Translation API error:', message);
      return res.status(500).json({ error: message });
    }
  });

  const httpServer = http.createServer(app);

  if (!isProduction) {
    const { createServer: createViteServer } = await import('vite');
    const vite = await createViteServer({
      server: {
        middlewareMode: true,
        hmr: { server: httpServer },
      },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.resolve(__dirname, 'dist');
    app.use(express.static(distPath));
    app.get('*', (_req, res) => {
      const indexFile = path.join(distPath, 'index.html');
      if (fs.existsSync(indexFile)) {
        res.sendFile(indexFile);
      } else {
        res.status(404).send('Build not found. Run npm run build.');
      }
    });
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Server listening on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
