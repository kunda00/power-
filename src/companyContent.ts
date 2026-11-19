export type ServiceId =
  | 'rcc'
  | 'pcc'
  | 'sub_drain'
  | 'toe_wall'
  | 'culvert_box'
  | 'mitti_dressing'
  | 'soil_cutting';

export type ServiceCategory = 'concrete' | 'drainage' | 'earthwork';

export interface ImmutableCompanyInfo {
  shortHeaderMark: string;
  officialNameHindi: string;
  officialNameEnglish: string;
  fullDisplayName: string;
  taglineEnglish: string;
  udyamRegistration: string;
  originalAddressHindi: string;
  originalAddressEnglish: string;
  mobile: string;
  telHref: string;
  email: string;
  mailtoHref: string;
}

export const IMMUTABLE_COMPANY_INFO: ImmutableCompanyInfo = {
  shortHeaderMark: 'POWER रुद्रा ॐ कुंडा',
  officialNameHindi: 'POWER रुद्रा ॐ कुंडा',
  officialNameEnglish: 'POWER RUDRA KUNDA',
  fullDisplayName: 'POWER रुद्रा ॐ कुंडा (POWER RUDRA KUNDA)',
  taglineEnglish: 'Engineering & Construction Solutions',
  udyamRegistration: 'UDYAM-HR-06-0096289',
  originalAddressHindi: 'गांव व पोस्ट - गैबीपुर, तहसील - बरवाला, जिला - हिसार (हरियाणा) - 125121',
  originalAddressEnglish: 'Village & Post - Gaibipur, Tehsil - Barwala, District - Hisar (Haryana) - 125121',
  mobile: '9813559915',
  telHref: 'tel:+919813559915',
  email: 'ishwarkunda311@gmail.com',
  mailtoHref: 'mailto:ishwarkunda311@gmail.com',
};

export interface ServiceMeta {
  id: ServiceId;
  code: string;
  category: ServiceCategory;
  originalTerm: string;
}

export const SERVICE_METADATA: ServiceMeta[] = [
  { id: 'rcc', code: '01', category: 'concrete', originalTerm: 'RCC (Reinforced Cement Concrete)' },
  { id: 'pcc', code: '02', category: 'concrete', originalTerm: 'PCC (Plain Cement Concrete)' },
  { id: 'sub_drain', code: '03', category: 'drainage', originalTerm: 'Sub Drain (Subsurface Drainage)' },
  { id: 'toe_wall', code: '04', category: 'drainage', originalTerm: 'Toe Wall (Embankment Retaining)' },
  { id: 'culvert_box', code: '05', category: 'concrete', originalTerm: 'Culvert Box (RCC Box Culvert)' },
  { id: 'mitti_dressing', code: '06', category: 'earthwork', originalTerm: 'कच्ची मिट्टी की ड्रेसिंग' },
  { id: 'soil_cutting', code: '07', category: 'earthwork', originalTerm: 'Soil Cutting (Bulk Excavation)' },
];

export interface TranslatedService {
  id: ServiceId | string;
  title: string;
  categoryLabel: string;
  summary: string;
  technicalSpecs: string[];
}

export interface LocalizedContent {
  languageNativeName: string;
  isRtl: boolean;
  nav: {
    overview: string;
    services: string;
    brochure: string;
    contact: string;
    viewBrochure: string;
  };
  controls: {
    languageLabel: string;
    allWorldLanguages: string;
    recipientView: string;
    recipientBannerTitle: string;
    recipientBannerSubtitle: string;
    exitRecipientView: string;
    copyShareLink: string;
    linkCopied: string;
    keepOriginalInline: string;
    originalContentNote: string;
  };
  hero: {
    subtitle: string;
    headline: string;
    description: string;
    primaryCta: string;
    callNow: string;
    emailUs: string;
    zoomSchematic: string;
    schematicCaption: string;
  };
  credentials: {
    udyamLabel: string;
    addressLabel: string;
    addressTranslated: string;
    mobileLabel: string;
    emailLabel: string;
  };
  servicesSection: {
    heading: string;
    subheading: string;
    filterAll: string;
    filterConcrete: string;
    filterDrainage: string;
    filterEarthwork: string;
    zoomInLabel: string;
    scopeLabel: string;
    originalTermLabel: string;
  };
  services: TranslatedService[];
  brochureSection: {
    heading: string;
    subheading: string;
    downloadPdf: string;
    downloadingPdf: string;
    printPdf: string;
    fitScreen: string;
    zoomLabel: string;
    page1Tag: string;
    page2Tag: string;
    companyProfileTitle: string;
    companyProfileBody: string;
    coreCapabilitiesTitle: string;
    serviceCatalogueTitle: string;
    officialDeclaration: string;
  };
  contactSection: {
    heading: string;
    subheading: string;
    directReachTitle: string;
    officeAddressTitle: string;
    originalAddressNote: string;
    inquiryTitle: string;
    namePlaceholder: string;
    phonePlaceholder: string;
    workTypePlaceholder: string;
    messagePlaceholder: string;
    sendViaEmail: string;
    callDirect: string;
    footerNotice: string;
  };
}

export const ENGLISH_CONTENT: LocalizedContent = {
  languageNativeName: 'English',
  isRtl: false,
  nav: {
    overview: 'Overview',
    services: 'Services',
    brochure: 'Brochure',
    contact: 'Contact',
    viewBrochure: 'View Brochure',
  },
  controls: {
    languageLabel: 'Language',
    allWorldLanguages: 'All World Languages',
    recipientView: 'Recipient View',
    recipientBannerTitle: 'Read-Only Recipient View',
    recipientBannerSubtitle:
      'Viewing official company profile and brochure in protected recipient mode with original credentials intact.',
    exitRecipientView: 'Exit Recipient View',
    copyShareLink: 'Share Link',
    linkCopied: 'Link Copied',
    keepOriginalInline: 'Show Original Reference Inline',
    originalContentNote: 'Original registration, firm identity, and native technical terms remain preserved.',
  },
  hero: {
    subtitle: 'Engineering & Construction Solutions',
    headline: 'Civil & Earthwork Execution with Structural Precision',
    description:
      'Registered civil infrastructure and earthmoving contractor based in Hisar, Haryana. Specializing in RCC & PCC structures, highway box culverts, toe walls, subsurface drainage, raw soil dressing (कच्ची मिट्टी की ड्रेसिंग), and bulk soil cutting.',
    primaryCta: 'Open Brochure & Zoom',
    callNow: 'Call 9813559915',
    emailUs: 'Email Official Desk',
    zoomSchematic: 'Zoom Blueprint',
    schematicCaption: 'Integrated Highway & Canal Infrastructure Section (RCC Box Culvert, Toe Wall, Sub Drain & Embankment Dressing)',
  },
  credentials: {
    udyamLabel: 'Udyam Registration',
    addressLabel: 'Registered Office',
    addressTranslated: 'Village & Post - Gaibipur, Tehsil - Barwala, District - Hisar (Haryana) - 125121',
    mobileLabel: 'Direct Mobile',
    emailLabel: 'Official Email',
  },
  servicesSection: {
    heading: 'Civil & Earthwork Services',
    subheading:
      'Comprehensive structural concrete, drainage protection, and precision earthmoving capabilities executed to project drawings and engineering specifications.',
    filterAll: 'All Services',
    filterConcrete: 'Concrete & Culverts',
    filterDrainage: 'Drainage & Retaining',
    filterEarthwork: 'Earthwork & Dressing',
    zoomInLabel: 'Zoom In',
    scopeLabel: 'Execution Scope',
    originalTermLabel: 'Original Reference',
  },
  services: [
    {
      id: 'rcc',
      title: 'RCC (Reinforced Cement Concrete)',
      categoryLabel: 'Structural Concrete',
      summary:
        'High-strength steel-reinforced concrete execution for foundations, retaining structures, slabs, beams, and heavy civil infrastructure.',
      technicalSpecs: [
        'Precision rebar cutting, bending, and cover block placement per structural drawings',
        'Controlled concrete batching, vibration compaction, and curing management',
        'Heavy-duty shuttering and alignment verification for dimensional accuracy',
      ],
    },
    {
      id: 'pcc',
      title: 'PCC (Plain Cement Concrete)',
      categoryLabel: 'Leveling & Sub-Base',
      summary:
        'Uniform plain cement concrete bedding, foundation leveling courses, flooring bases, and structural blinding layers.',
      technicalSpecs: [
        'Compacted sub-grade preparation prior to concrete placement',
        'Accurate datum leveling and uniform thickness control',
        'Clean surface finishing ready for structural RCC footing layout',
      ],
    },
    {
      id: 'sub_drain',
      title: 'Sub Drain (Subsurface Drainage)',
      categoryLabel: 'Hydrological Protection',
      summary:
        'Engineered subsurface trench drainage networks designed to relieve hydrostatic pore pressure beneath roads, embankments, and retaining walls.',
      technicalSpecs: [
        'Graded aggregate filter media and geotextile wrapping installation',
        'Perforated carrier pipe alignment with continuous outfall gradient',
        'Prevents subgrade saturation, piping erosion, and pavement settlement',
      ],
    },
    {
      id: 'toe_wall',
      title: 'Toe Wall (Embankment Retaining)',
      categoryLabel: 'Slope Stabilization',
      summary:
        'Robust concrete and masonry toe walls protecting embankment bases, canal banks, and road shoulders against scour and lateral slip.',
      technicalSpecs: [
        'Keyed foundation trenching below scour and frost depth',
        'Integrated weep holes and granular backfill filter behind wall stem',
        'Designed for long-term embankment edge stability during monsoon runoff',
      ],
    },
    {
      id: 'culvert_box',
      title: 'Culvert Box (RCC Box Culvert)',
      categoryLabel: 'Hydraulic Crossings',
      summary:
        'Cast-in-situ and modular RCC box culverts engineered for uninterrupted stormwater, irrigation canal, and cross-drainage flow beneath roadways.',
      technicalSpecs: [
        'Bottom raft, haunched vertical walls, and top deck slab reinforcement',
        'Wing walls, curtain walls, and apron protection against outlet erosion',
        'Heavy traffic load bearing capacity aligned with highway & rural road norms',
      ],
    },
    {
      id: 'mitti_dressing',
      title: 'कच्ची मिट्टी की ड्रेसिंग (Raw Soil Dressing)',
      categoryLabel: 'Earthwork Finishing',
      summary:
        'Precision shaping, slope trimming, and camber dressing of raw earthen embankments, canal bunds, and road formations.',
      technicalSpecs: [
        'Accurate side-slope batter trimming (1.5:1 / 2:1) along alignment pegs',
        'Uniform crown camber, berm leveling, and compacted layer finishing',
        'Prepares clean earth profiles for turfing, pitching, or sub-base layers',
      ],
    },
    {
      id: 'soil_cutting',
      title: 'Soil Cutting & Bulk Excavation',
      categoryLabel: 'Earthmoving',
      summary:
        'Controlled mechanical excavation, trench cutting, and terrain grading for highways, drainage channels, foundations, and site development.',
      technicalSpecs: [
        'Bench cutting and formation level trimming to surveyed RL benchmarks',
        'Segmented haulage, disposal, or selective reuse of excavated earth',
        'Safe battered side slopes preventing trench wall collapse',
      ],
    },
  ],
  brochureSection: {
    heading: 'Official PDF Brochure & Zoom Viewer',
    subheading:
      'Inspect the complete two-page technical brochure at up to 200% zoom or download a crisp PDF copy in your selected language.',
    downloadPdf: 'Download PDF',
    downloadingPdf: 'Generating PDF...',
    printPdf: 'Print / Save PDF',
    fitScreen: 'Fit Width',
    zoomLabel: 'Zoom',
    page1Tag: 'Page 1 of 2 · Corporate Profile',
    page2Tag: 'Page 2 of 2 · Services Catalogue',
    companyProfileTitle: 'Company Profile & Registration',
    companyProfileBody:
      'POWER रुद्रा ॐ कुंडा (POWER RUDRA KUNDA) is a dedicated civil engineering and earthwork execution enterprise headquartered in Gaibipur, Barwala (Hisar, Haryana). We execute structural concrete works, cross-drainage box culverts, slope retention toe walls, subsurface drains, and precision earthmoving with disciplined site supervision and timely delivery.',
    coreCapabilitiesTitle: 'Core Infrastructure Disciplines',
    serviceCatalogueTitle: 'Technical Scope of Civil & Earthwork Services',
    officialDeclaration:
      'Official digital brochure for tender, client, and contractor reference. Verify direct contact via mobile 9813559915 or email ishwarkunda311@gmail.com.',
  },
  contactSection: {
    heading: 'Direct Contact & Site Office',
    subheading:
      'Reach out directly for civil works tenders, earthwork contracts, site inspections, and project rate inquiries.',
    directReachTitle: 'Verified Communication Channels',
    officeAddressTitle: 'Registered Office Address',
    originalAddressNote: 'Original Hindi Address Preserved',
    inquiryTitle: 'Draft Project Inquiry',
    namePlaceholder: 'Your Name / Organization',
    phonePlaceholder: 'Your Contact Number',
    workTypePlaceholder: 'Required Service (e.g., Culvert Box, RCC, Soil Cutting)',
    messagePlaceholder: 'Project location, approximate quantity, or site details...',
    sendViaEmail: 'Open Email Draft',
    callDirect: 'Call 9813559915',
    footerNotice:
      'POWER रुद्रा ॐ कुंडा (POWER RUDRA KUNDA) — Engineering & Construction Solutions · Udyam Reg: UDYAM-HR-06-0096289',
  },
};

export const HINDI_CONTENT: LocalizedContent = {
  languageNativeName: 'हिन्दी',
  isRtl: false,
  nav: {
    overview: 'परिचय',
    services: 'सेवाएं',
    brochure: 'ब्रोशर',
    contact: 'संपर्क',
    viewBrochure: 'ब्रोशर देखें',
  },
  controls: {
    languageLabel: 'भाषा',
    allWorldLanguages: 'सभी विश्व भाषाएं',
    recipientView: 'प्राप्तकर्ता दृश्य',
    recipientBannerTitle: 'रीड-ओनली प्राप्तकर्ता दृश्य (Read-Only Recipient View)',
    recipientBannerSubtitle:
      'आप आधिकारिक कंपनी प्रोफाइल और ब्रोशर को सुरक्षित प्राप्तकर्ता मोड में देख रहे हैं जिसमें मूल विवरण सुरक्षित हैं।',
    exitRecipientView: 'सामान्य दृश्य पर लौटें',
    copyShareLink: 'लिंक शेयर करें',
    linkCopied: 'लिंक कॉपी हुआ',
    keepOriginalInline: 'मूल हिंदी/अंग्रेजी संदर्भ साथ दिखाएं',
    originalContentNote: 'मूल पंजीकरण, फर्म पहचान और तकनीकी शब्दावली यथावत सुरक्षित रखी गई है।',
  },
  hero: {
    subtitle: 'इंजीनियरिंग एवं कंस्ट्रक्शन सॉल्यूशंस',
    headline: 'सटीक सिविल निर्माण और अर्थवर्क निष्पादन',
    description:
      'हिसार (हरियाणा) स्थित पंजीकृत सिविल इंफ्रास्ट्रक्चर एवं अर्थमूविंग ठेकेदार। हम RCC, PCC, सब ड्रेन, टो वॉल, कल्वर्ट बॉक्स, कच्ची मिट्टी की ड्रेसिंग और सॉइल कटिंग के कार्यों में विशेषज्ञ हैं।',
    primaryCta: 'ब्रोशर देखें व ज़ूम करें',
    callNow: 'कॉल करें: 9813559915',
    emailUs: 'ईमेल भेजें',
    zoomSchematic: 'ड्राइंग ज़ूम करें',
    schematicCaption: 'एकीकृत हाईवे और नहर निर्माण सेक्शन (RCC बॉक्स कल्वर्ट, टो वॉल, सब ड्रेन और मिट्टी की ड्रेसिंग)',
  },
  credentials: {
    udyamLabel: 'उद्यम पंजीकरण (Udyam Reg.)',
    addressLabel: 'पंजीकृत पता',
    addressTranslated: 'गांव व पोस्ट - गैबीपुर, तहसील - बरवाला, जिला - हिसार (हरियाणा) - 125121',
    mobileLabel: 'मोबाइल नंबर',
    emailLabel: 'आधिकारिक ईमेल',
  },
  servicesSection: {
    heading: 'सिविल एवं अर्थवर्क सेवाएं',
    subheading:
      'प्रोजेक्ट ड्राइंग और इंजीनियरिंग मानकों के अनुरूप स्ट्रक्चरल कंक्रीट, जल निकासी सुरक्षा और सटीक अर्थवर्क का संपूर्ण निष्पादन।',
    filterAll: 'सभी सेवाएं',
    filterConcrete: 'कंक्रीट व कल्वर्ट',
    filterDrainage: 'ड्रेनेज व टो वॉल',
    filterEarthwork: 'मिट्टी व अर्थवर्क',
    zoomInLabel: 'ज़ूम इन',
    scopeLabel: 'कार्य क्षेत्र',
    originalTermLabel: 'मूल संदर्भ',
  },
  services: [
    {
      id: 'rcc',
      title: 'RCC (प्रबलित सीमेंट कंक्रीट कार्य)',
      categoryLabel: 'स्ट्रक्चरल कंक्रीट',
      summary:
        'फाउंडेशन, रिटेनिंग स्ट्रक्चर, स्लैब, बीम और भारी सिविल निर्माण के लिए उच्च क्षमता वाला सरिया-युक्त RCC निर्माण कार्य।',
      technicalSpecs: [
        'स्ट्रक्चरल ड्राइंग के अनुसार सटीक सरिया कटिंग, बेंडिंग और कवर ब्लॉक स्थापना',
        'नियंत्रित कंक्रीट मिक्सिंग, वाइब्रेशन कॉम्पैक्शन और समयबद्ध तराई (क्योंरिंग)',
        'आयामी सटीकता के लिए मजबूत शटरिंग और एलाइनमेंट जांच',
      ],
    },
    {
      id: 'pcc',
      title: 'PCC (सादा सीमेंट कंक्रीट कार्य)',
      categoryLabel: 'लेवलिंग एवं सब-बेस',
      summary:
        'नींव बेडिंग, लेवलिंग कोर्स, फर्श बेस और स्ट्रक्चरल फुटिंग के नीचे एकसमान सादा सीमेंट कंक्रीट (PCC) कार्य।',
      technicalSpecs: [
        'कंक्रीट डालने से पहले सब-ग्रेड की पूर्ण कॉम्पैक्शन तैयारी',
        'सटीक लेवल और एकसमान मोटाई का नियंत्रण',
        'RCC फुटिंग लेआउट के लिए साफ व समतल सतह फिनिशिंग',
      ],
    },
    {
      id: 'sub_drain',
      title: 'सब ड्रेन (Sub Drain / भूमिगत जल निकासी)',
      categoryLabel: 'जल निकासी सुरक्षा',
      summary:
        'सड़कों, तटबंधों और रिटेनिंग दीवारों के नीचे अतिरिक्त भू-जल दबाव को कम करने के लिए इंजीनियरिंग सब-ड्रेन प्रणाली।',
      technicalSpecs: [
        'ग्रेडेड एग्रीगेट फिल्टर मीडिया और जियोटेक्सटाइल रैपिंग की स्थापना',
        'निरंतर ढलान के साथ छिद्रयुक्त पाइप लाइन का सटीक संरेखण',
        'सब-ग्रेड कटाव और सड़क धंसने से दीर्घकालिक सुरक्षा',
      ],
    },
    {
      id: 'toe_wall',
      title: 'टो वॉल (Toe Wall / तटबंध सुरक्षा दीवार)',
      categoryLabel: 'ढलान स्थिरीकरण',
      summary:
        'सड़क किनारे, नहर तटबंध और मिट्टी की ढलानों को कटाव व फिसलन से बचाने के लिए मजबूत कंक्रीट व चिनाई टो वॉल निर्माण।',
      technicalSpecs: [
        'कटाव स्तर से नीचे गहरी व मजबूत नींव की खुदाई',
        'दीवार के पीछे वीप होल्स और ग्रेन्युलर बैकफिल फिल्टर की व्यवस्था',
        'मानसून व जल बहाव के दौरान तटबंध की पूर्ण स्थिरता',
      ],
    },
    {
      id: 'culvert_box',
      title: 'कल्वर्ट बॉक्स (RCC Box Culvert)',
      categoryLabel: 'क्रॉस-ड्रेनेज निर्माण',
      summary:
        'सड़कों और राजमार्गों के नीचे वर्षा जल, नहर और सिंचाई निकासी के लिए मजबूत RCC बॉक्स कल्वर्ट का निर्माण।',
      technicalSpecs: [
        'बॉटम राफ्ट, हॉन्च वर्टिकल वॉल और टॉप डेक स्लैब का सुदृढ़ निर्माण',
        'आउटलेट कटाव रोकने हेतु विंग वॉल, कर्टन वॉल और एप्रन सुरक्षा',
        'हाईवे और ग्रामीण सड़क भार मानकों के अनुरूप उच्च क्षमता',
      ],
    },
    {
      id: 'mitti_dressing',
      title: 'कच्ची मिट्टी की ड्रेसिंग (Raw Soil Dressing)',
      categoryLabel: 'अर्थवर्क फिनिशिंग',
      summary:
        'कच्चे मिट्टी के तटबंधों, नहर की पटरियों और सड़क फॉर्मेशन की सटीक स्लोप ट्रिमिंग, कैंबर और ड्रेसिंग कार्य।',
      technicalSpecs: [
        'निर्धारित ढलान अनुपात (1.5:1 / 2:1) के अनुसार सटीक साइड-स्लोप ड्रेसिंग',
        'एकसमान क्राउन कैंबर, बर्म लेवलिंग और कॉम्पैक्टेड लेयर फिनिशिंग',
        'टर्फिंग, स्टोन पिचिंग या सब-बेस लेयर के लिए आदर्श सतह तैयारी',
      ],
    },
    {
      id: 'soil_cutting',
      title: 'सॉइल कटिंग (Soil Cutting / मिट्टी खुदाई)',
      categoryLabel: 'अर्थमूविंग एवं एक्सकेवेशन',
      summary:
        'राजमार्ग, नहर, ड्रेनेज ट्रेंच और साइट लेवलिंग के लिए नियंत्रित मशीनी मिट्टी खुदाई और ग्रेड कटिंग कार्य।',
      technicalSpecs: [
        'सर्वेक्षण RL बेंचमार्क के अनुसार बेंच कटिंग और फॉर्मेशन लेवल ट्रिमिंग',
        'खुदाई की गई मिट्टी का व्यवस्थित परिवहन और उपयोग',
        'सुरक्षित ढलान के साथ ट्रेंच कटिंग ताकि मिट्टी धंसने का खतरा न रहे',
      ],
    },
  ],
  brochureSection: {
    heading: 'आधिकारिक PDF ब्रोशर एवं ज़ूम व्यूअर',
    subheading:
      'पूरे दो-पृष्ठीय तकनीकी ब्रोशर को 200% तक ज़ूम करके देखें या अपनी चुनी हुई भाषा में PDF डाउनलोड करें।',
    downloadPdf: 'PDF डाउनलोड करें',
    downloadingPdf: 'PDF तैयार हो रहा है...',
    printPdf: 'प्रिंट / PDF सेव',
    fitScreen: 'स्क्रीन के अनुसार',
    zoomLabel: 'ज़ूम',
    page1Tag: 'पृष्ठ 1 / 2 · कंपनी प्रोफाइल',
    page2Tag: 'पृष्ठ 2 / 2 · सेवा सूची',
    companyProfileTitle: 'कंपनी प्रोफाइल एवं पंजीकरण विवरण',
    companyProfileBody:
      'POWER रुद्रा ॐ कुंडा (POWER RUDRA KUNDA) गांव व पोस्ट - गैबीपुर, तहसील - बरवाला, जिला - हिसार (हरियाणा) स्थित एक समर्पित सिविल इंजीनियरिंग एवं अर्थवर्क निर्माण उद्यम है। हम अनुशासित साइट पर्यवेक्षण और समयबद्ध गुणवत्ता के साथ RCC, PCC, बॉक्स कल्वर्ट, टो वॉल, सब-ड्रेन, कच्ची मिट्टी की ड्रेसिंग और सॉइल कटिंग का कार्य करते हैं।',
    coreCapabilitiesTitle: 'प्रमुख निर्माण एवं इंजीनियरिंग क्षेत्र',
    serviceCatalogueTitle: 'सिविल एवं अर्थवर्क सेवाओं का तकनीकी विवरण',
    officialDeclaration:
      'टेंडर, क्लाइंट और ठेकेदार संदर्भ हेतु आधिकारिक डिजिटल ब्रोशर। सीधी पुष्टि के लिए मोबाइल 9813559915 या ईमेल ishwarkunda311@gmail.com पर संपर्क करें।',
  },
  contactSection: {
    heading: 'सीधा संपर्क एवं कार्यालय विवरण',
    subheading:
      'सिविल निर्माण टेंडर, अर्थवर्क अनुबंध, साइट निरीक्षण और दर पूछताछ के लिए सीधे संपर्क करें।',
    directReachTitle: 'सत्यापित संपर्क माध्यम',
    officeAd
