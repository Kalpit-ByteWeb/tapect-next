interface CountryInfo {
    phoneCode: string;
    postalCodeRegex?: RegExp; // Optional regex for postal code
    phoneNumberRegex?: RegExp; // Optional regex for phone number
  }
  
  const countryData: { [key: string]: CountryInfo } = {
    Afghanistan: { phoneCode: "+93", postalCodeRegex: /^\d{4}$/, phoneNumberRegex: /^\d{9}$/ }, // Example: 4 digits
    Albania: { phoneCode: "+355", postalCodeRegex: /^\d{4}$/, phoneNumberRegex: /^\d{8}$/ },
    Algeria: { phoneCode: "+213", postalCodeRegex: /^\d{5}$/, phoneNumberRegex: /^\d{9}$/ }, // Example: 5 digits
    Andorra: { phoneCode: "+376", postalCodeRegex: /^(AD)\d{3}$/, phoneNumberRegex: /^\d{8}$/ }, // Example: AD100
    Angola: { phoneCode: "+244", phoneNumberRegex: /^\d{9}$/ },
    Argentina: { phoneCode: "+54", postalCodeRegex: /^[A-Z]\d{4}[A-Z]{3}$/, phoneNumberRegex: /^\d{8,10}$/ }, // Example: N8300HNA
    Armenia: { phoneCode: "+374", postalCodeRegex: /^\d{4}$/, phoneNumberRegex: /^\d{8}$/ },
    Australia: { phoneCode: "+61", postalCodeRegex: /^\d{4}$/, phoneNumberRegex: /^\d{9}$/ }, // Example: 4 digits
    Austria: { phoneCode: "+43", postalCodeRegex: /^\d{4}$/, phoneNumberRegex: /^\d{10,11}$/ },
    Azerbaijan: { phoneCode: "+994", postalCodeRegex: /^\d{4}$/, phoneNumberRegex: /^\d{9}$/ },
    Bahrain: { phoneCode: "+973", postalCodeRegex: /^\d{4}$/, phoneNumberRegex: /^\d{8}$/ },
    Bangladesh: { phoneCode: "+880", postalCodeRegex: /^\d{4}$/, phoneNumberRegex: /^\d{10}$/ },
    Belarus: { phoneCode: "+375", postalCodeRegex: /^\d{6}$/, phoneNumberRegex: /^\d{9}$/ },
    Belgium: { phoneCode: "+32", postalCodeRegex: /^\d{4}$/, phoneNumberRegex: /^\d{9}$/ },
    Belize: { phoneCode: "+501", phoneNumberRegex: /^\d{8}$/ },
    Benin: { phoneCode: "+229", phoneNumberRegex: /^\d{8}$/ },
    Bhutan: { phoneCode: "+975", phoneNumberRegex: /^\d{8}$/ },
    Bolivia: { phoneCode: "+591", phoneNumberRegex: /^\d{8}$/ },
    "Bosnia and Herzegovina": { phoneCode: "+387", postalCodeRegex: /^\d{5}$/, phoneNumberRegex: /^\d{8}$/ },
    Botswana: { phoneCode: "+267", phoneNumberRegex: /^\d{8}$/ },
    Brazil: { phoneCode: "+55", postalCodeRegex: /^\d{5}-\d{3}$/, phoneNumberRegex: /^\d{10,11}$/ }, // Example: 01001-000
    Brunei: { phoneCode: "+673", phoneNumberRegex: /^\d{7}$/ },
    Bulgaria: { phoneCode: "+359", postalCodeRegex: /^\d{4}$/, phoneNumberRegex: /^\d{9}$/ },
    "Burkina Faso": { phoneCode: "+226", phoneNumberRegex: /^\d{8}$/ },
    Burundi: { phoneCode: "+257", phoneNumberRegex: /^\d{8}$/ },
    Cambodia: { phoneCode: "+855", phoneNumberRegex: /^\d{9}$/ },
    Cameroon: { phoneCode: "+237", phoneNumberRegex: /^\d{9}$/ },
    Canada: { phoneCode: "+1", postalCodeRegex: /^[A-Z]\d[A-Z] \d[A-Z]\d$/, phoneNumberRegex: /^\d{10}$/ }, // Example: M5H 2N2
    "Cape Verde": { phoneCode: "+238", phoneNumberRegex: /^\d{8}$/ },
    "Central African Republic": { phoneCode: "+236", phoneNumberRegex: /^\d{8}$/ },
    Chad: { phoneCode: "+235", phoneNumberRegex: /^\d{8}$/ },
    Chile: { phoneCode: "+56", phoneNumberRegex: /^\d{9}$/ },
    China: { phoneCode: "+86", postalCodeRegex: /^\d{6}$/, phoneNumberRegex: /^\d{11}$/ },
    Colombia: { phoneCode: "+57", postalCodeRegex: /^\d{6}$/, phoneNumberRegex: /^\d{10}$/ }, // Example: 110221
    Comoros: { phoneCode: "+269", phoneNumberRegex: /^\d{7}$/ },
    Congo: { phoneCode: "+242", phoneNumberRegex: /^\d{9}$/ },
    "Costa Rica": { phoneCode: "+506", postalCodeRegex: /^\d{4,5}$/, phoneNumberRegex: /^\d{8}$/ },
    Croatia: { phoneCode: "+385", postalCodeRegex: /^\d{5}$/, phoneNumberRegex: /^\d{9}$/ },
    Cuba: { phoneCode: "+53", postalCodeRegex: /^\d{5}$/, phoneNumberRegex: /^\d{8}$/ }, // Example: 10400
    Cyprus: { phoneCode: "+357", postalCodeRegex: /^\d{4}$/, phoneNumberRegex: /^\d{8}$/ },
    "Czech Republic": { phoneCode: "+420", postalCodeRegex: /^\d{3} \d{2}$/, phoneNumberRegex: /^\d{9}$/ }, // Example: 100 00
    Denmark: { phoneCode: "+45", postalCodeRegex: /^\d{4}$/, phoneNumberRegex: /^\d{8}$/ },
    Djibouti: { phoneCode: "+253", phoneNumberRegex: /^\d{8}$/ },
    Dominica: { phoneCode: "+1-767", phoneNumberRegex: /^\d{7}$/ },
    "Dominican Republic": { phoneCode: "+1-809, 1-829, 1-849", postalCodeRegex: /^\d{5}$/, phoneNumberRegex: /^\d{10}$/ }, // Example: 10101
    Ecuador: { phoneCode: "+593", postalCodeRegex: /^([A-Z]{2}[0-9]{6})$/, phoneNumberRegex: /^\d{9}$/ }, // Example: EC010150
    Egypt: { phoneCode: "+20", postalCodeRegex: /^\d{5}$/, phoneNumberRegex: /^\d{10,11}$/ },
    "El Salvador": { phoneCode: "+503", phoneNumberRegex: /^\d{8}$/ },
    "Equatorial Guinea": { phoneCode: "+240", phoneNumberRegex: /^\d{9}$/ },
    Eritrea: { phoneCode: "+291", phoneNumberRegex: /^\d{7}$/ },
    Estonia: { phoneCode: "+372", postalCodeRegex: /^\d{5}$/, phoneNumberRegex: /^\d{8}$/ }, // Example: 10111
    Eswatini: { phoneCode: "+268", phoneNumberRegex: /^\d{8}$/ },
    Ethiopia: { phoneCode: "+251", postalCodeRegex: /^\d{4}$/, phoneNumberRegex: /^\d{9}$/ }, // Example: 1000
    Fiji: { phoneCode: "+679", phoneNumberRegex: /^\d{7}$/ },
    Finland: { phoneCode: "+358", postalCodeRegex: /^\d{5}$/, phoneNumberRegex: /^\d{9}$/ }, // Example: 00100
    France: { phoneCode: "+33", postalCodeRegex: /^\d{5}$/, phoneNumberRegex: /^\d{9}$/ },
    Gabon: { phoneCode: "+241", phoneNumberRegex: /^\d{9}$/ },
    Gambia: { phoneCode: "+220", phoneNumberRegex: /^\d{7}$/ },
    Georgia: { phoneCode: "+995", postalCodeRegex: /^\d{4}$/, phoneNumberRegex: /^\d{9}$/ },
    Germany: { phoneCode: "+49", postalCodeRegex: /^\d{5}$/, phoneNumberRegex: /^\d{10,11}$/ },
    Ghana: { phoneCode: "+233", phoneNumberRegex: /^\d{9}$/ },
    Greece: { phoneCode: "+30", postalCodeRegex: /^\d{5}$/, phoneNumberRegex: /^\d{10}$/ },
    Grenada: { phoneCode: "+1-473", phoneNumberRegex: /^\d{7}$/ },
    Guatemala: { phoneCode: "+502", postalCodeRegex: /^\d{5}$/, phoneNumberRegex: /^\d{8}$/ }, // Example: 01001
    Guinea: { phoneCode: "+224", phoneNumberRegex: /^\d{8}$/ },
    "Guinea-Bissau": { phoneCode: "+245", phoneNumberRegex: /^\d{8}$/ },
    Guyana: { phoneCode: "+592", phoneNumberRegex: /^\d{7}$/ },
    Haiti: { phoneCode: "+509", postalCodeRegex: /^\d{4}$/, phoneNumberRegex: /^\d{8}$/ },
    Honduras: { phoneCode: "+504", postalCodeRegex: /^\d{5}$/, phoneNumberRegex: /^\d{8}$/ },
    Hungary: { phoneCode: "+36", postalCodeRegex: /^\d{4}$/, phoneNumberRegex: /^\d{9}$/ },
    Iceland: { phoneCode: "+354", postalCodeRegex: /^\d{3}$/, phoneNumberRegex: /^\d{7}$/ },
    India: { phoneCode: "+91", postalCodeRegex: /^\d{6}$/, phoneNumberRegex: /^\d{10}$/ },
    Indonesia: { phoneCode: "+62", postalCodeRegex: /^\d{5}$/, phoneNumberRegex: /^\d{10,12}$/ },
    Iran: { phoneCode: "+98", postalCodeRegex: /^\d{5}-\d{5}$/, phoneNumberRegex: /^\d{11}$/ }, // Example: 13136-5344
    Iraq: { phoneCode: "+964", postalCodeRegex: /^\d{5}$/, phoneNumberRegex: /^\d{10}$/ },
    Ireland: { phoneCode: "+353", phoneNumberRegex: /^\d{9}$/ },
    Israel: { phoneCode: "+972", postalCodeRegex: /^\d{5,7}$/, phoneNumberRegex: /^\d{9}$/ }, // Example: 6158201
    Italy: { phoneCode: "+39", postalCodeRegex: /^\d{5}$/, phoneNumberRegex: /^\d{9}$/ }, // Example: 20121
    Jamaica: { phoneCode: "+1-876", phoneNumberRegex: /^\d{7}$/ },
    Japan: { phoneCode: "+81", postalCodeRegex: /^\d{3}-\d{4}$/, phoneNumberRegex: /^\d{10}$/ }, // Example: 100-0001
    Jordan: { phoneCode: "+962", postalCodeRegex: /^\d{5}$/, phoneNumberRegex: /^\d{9}$/ }, // Example: 11118
    Kazakhstan: { phoneCode: "+7", postalCodeRegex: /^\d{6}$/, phoneNumberRegex: /^\d{10}$/ }, // Example: 050000
    Kenya: { phoneCode: "+254", postalCodeRegex: /^\d{5}$/, phoneNumberRegex: /^\d{9}$/ }, // Example: 00100
    Kiribati: { phoneCode: "+686", phoneNumberRegex: /^\d{5}$/ },
    Kosovo: { phoneCode: "+383", postalCodeRegex: /^\d{5}$/, phoneNumberRegex: /^\d{8}$/ }, // Example: 10000
    Kuwait: { phoneCode: "+965", postalCodeRegex: /^\d{5}$/, phoneNumberRegex: /^\d{8}$/ }, // Example: 13051
    Kyrgyzstan: { phoneCode: "+996", postalCodeRegex: /^\d{6}$/, phoneNumberRegex: /^\d{9}$/ }, // Example: 720001
    Laos: { phoneCode: "+856", phoneNumberRegex: /^\d{8}$/ },
    Latvia: { phoneCode: "+371", postalCodeRegex: /^LV-\d{4}$/, phoneNumberRegex: /^\d{8}$/ }, // Example: LV-1050
    Lebanon: { phoneCode: "+961", postalCodeRegex: /^\d{4}(\s\d{4})?$/, phoneNumberRegex: /^\d{7,8}$/ }, // Example: 2012 2112
    Lesotho: { phoneCode: "+266", phoneNumberRegex: /^\d{8}$/ },
    Liberia: { phoneCode: "+231", postalCodeRegex: /^\d{4}$/, phoneNumberRegex: /^\d{7}$/ }, // Example: 1000
    Libya: { phoneCode: "+218", phoneNumberRegex: /^\d{9}$/ },
    Liechtenstein: { phoneCode: "+423", postalCodeRegex: /^\d{4}$/, phoneNumberRegex: /^\d{7}$/ }, // Example: 9490
    Lithuania: { phoneCode: "+370", postalCodeRegex: /^LT-\d{5}$/, phoneNumberRegex: /^\d{8}$/ }, // Example: LT-01001
    Luxembourg: { phoneCode: "+352", postalCodeRegex: /^\d{4}$/, phoneNumberRegex: /^\d{6}$/ }, // Example: 1111
    Madagascar: { phoneCode: "+261", postalCodeRegex: /^\d{3}$/, phoneNumberRegex: /^\d{9}$/ },
    Malawi: { phoneCode: "+265", phoneNumberRegex: /^\d{8}$/ },
    Malaysia: { phoneCode: "+60", postalCodeRegex: /^\d{5}$/, phoneNumberRegex: /^\d{10,11}$/ }, // Example: 50480
    Maldives: { phoneCode: "+960", postalCodeRegex: /^\d{4}$/, phoneNumberRegex: /^\d{7}$/ }, // Example: 23000
    Mali: { phoneCode: "+223", phoneNumberRegex: /^\d{8}$/ },
    Malta: { phoneCode: "+356", postalCodeRegex: /^[A-Z]{3}\s?\d{4}$/, phoneNumberRegex: /^\d{8}$/ }, // Example: VAL 1444
    "Marshall Islands": { phoneCode: "+692", postalCodeRegex: /^\d{5}$/, phoneNumberRegex: /^\d{7}$/ }, // Example: 96960
    Mauritania: { phoneCode: "+222", phoneNumberRegex: /^\d{8}$/ },
    Mauritius: { phoneCode: "+230", postalCodeRegex: /\d{4}/, phoneNumberRegex: /^\d{8}$/ }, //4 digits only
    Mexico: { phoneCode: "+52", postalCodeRegex: /^\d{5}$/, phoneNumberRegex: /^\d{10}$/ }, // Example: 50010
    Micronesia: { phoneCode: "+691", postalCodeRegex: /^\d{5}$/, phoneNumberRegex: /^\d{7}$/ }, // Example: 96941
    Moldova: { phoneCode: "+373", postalCodeRegex: /^\d{4}$/, phoneNumberRegex: /^\d{8}$/ },
    Monaco: { phoneCode: "+377", postalCodeRegex: /^980\d{2}$/, phoneNumberRegex: /^\d{8}$/ }, // Example: 98000
    Mongolia: { phoneCode: "+976", postalCodeRegex: /^\d{5}$/, phoneNumberRegex: /^\d{8}$/ }, // Example: 16000
    Montenegro: { phoneCode: "+382", postalCodeRegex: /^\d{5}$/, phoneNumberRegex: /^\d{8}$/ }, // Example: 81000
    Morocco: { phoneCode: "+212", postalCodeRegex: /^\d{5}$/, phoneNumberRegex: /^\d{9}$/ },
    Mozambique: { phoneCode: "+258", phoneNumberRegex: /^\d{9}$/ },
    Myanmar: { phoneCode: "+95", postalCodeRegex: /^\d{5}$/, phoneNumberRegex: /^\d{9}$/ }, //5 digits
    Namibia: { phoneCode: "+264", phoneNumberRegex: /^\d{9}$/ },
    Nauru: { phoneCode: "+674", phoneNumberRegex: /^\d{7}$/ },
    Nepal: { phoneCode: "+977", postalCodeRegex: /^\d{5}$/, phoneNumberRegex: /^\d{10}$/ }, //5 digits
    Netherlands: { phoneCode: "+31", postalCodeRegex: /^\d{4}\s?[A-Z]{2}$/, phoneNumberRegex: /^\d{9}$/ }, // Example: 1012 AB
    "New Zealand": { phoneCode: "+64", postalCodeRegex: /^\d{4}$/, phoneNumberRegex: /^\d{8}$/ },
    Nicaragua: { phoneCode: "+505", postalCodeRegex: /^\d{7}$/, phoneNumberRegex: /^\d{8}$/ }, //7 digits only
    Niger: { phoneCode: "+227", postalCodeRegex: /^\d{4}$/, phoneNumberRegex: /^\d{8}$/ },
    Nigeria: { phoneCode: "+234", postalCodeRegex: /^\d{6}$/, phoneNumberRegex: /^\d{8,11}$/ },
    Norway: { phoneCode: "+47", postalCodeRegex: /^\d{4}$/, phoneNumberRegex: /^\d{8}$/ },
    Oman: { phoneCode: "+968", postalCodeRegex: /^\d{3}$/, phoneNumberRegex: /^\d{8}$/ }, //3 digits only
    Pakistan: { phoneCode: "+92", postalCodeRegex: /^\d{5}$/, phoneNumberRegex: /^\d{10}$/ },
    Palau: { phoneCode: "+680", postalCodeRegex: /^\d{5}$/, phoneNumberRegex: /^\d{7}$/ }, //5 digits
    Panama: { phoneCode: "+507", postalCodeRegex: /^\d{4}$/, phoneNumberRegex: /^\d{8}$/ }, //4 digits
    "Papua New Guinea": { phoneCode: "+675", postalCodeRegex: /^\d{3}$/, phoneNumberRegex: /^\d{8}$/ }, //Example: 111
    Paraguay: { phoneCode: "+595", postalCodeRegex: /^\d{4}$/, phoneNumberRegex: /^\d{9}$/ }, //4 digits
    Peru: { phoneCode: "+51", postalCodeRegex: /^\d{5}$/, phoneNumberRegex: /^\d{9}$/ }, // 5 digits
    Philippines: { phoneCode: "+63", postalCodeRegex: /^\d{4}$/, phoneNumberRegex: /^\d{10}$/ }, //4 digits
    Poland: { phoneCode: "+48", postalCodeRegex: /^\d{2}-\d{3}$/, phoneNumberRegex: /^\d{9}$/ }, //00-950
    Portugal: { phoneCode: "+351", postalCodeRegex: /^\d{4}-\d{3}$/, phoneNumberRegex: /^\d{9}$/ }, //0000-000
    Qatar: { phoneCode: "+974", postalCodeRegex: /^\d{4}$/, phoneNumberRegex: /^\d{8}$/ }, //4 digits
    Romania: { phoneCode: "+40", postalCodeRegex: /^\d{6}$/, phoneNumberRegex: /^\d{9}$/ },
    Russia: { phoneCode: "+7", postalCodeRegex: /^\d{6}$/, phoneNumberRegex: /^\d{10}$/ },//6 digits
    Rwanda: { phoneCode: "+250", phoneNumberRegex: /^\d{9}$/ },
    "Saint Kitts and Nevis": { phoneCode: "+1-869", phoneNumberRegex: /^\d{7}$/ },
    "Saint Lucia": { phoneCode: "+1-758", phoneNumberRegex: /^\d{7}$/ },
    "Saint Vincent and the Grenadines": { phoneCode: "+1-784", phoneNumberRegex: /^\d{7}$/ },
    Samoa: { phoneCode: "+685", phoneNumberRegex: /^\d{7}$/ },
    "San Marino": { phoneCode: "+378", postalCodeRegex: /^4789\d$/, phoneNumberRegex: /^\d{9}$/ },//47890
    "São Tomé and Príncipe": { phoneCode: "+239", phoneNumberRegex: /^\d{7}$/ },
    "Saudi Arabia": { phoneCode: "+966", postalCodeRegex: /^\d{5}$/, phoneNumberRegex: /^\d{9}$/ },// 5 Digits
    Senegal: { phoneCode: "+221", phoneNumberRegex: /^\d{9}$/ },
    Serbia: { phoneCode: "+381", postalCodeRegex: /^\d{5,6}$/, phoneNumberRegex: /^\d{8,9}$/ }, //5 to 6 Digits
    Seychelles: { phoneCode: "+248", phoneNumberRegex: /^\d{7}$/ },
    "Sierra Leone": { phoneCode: "+232", phoneNumberRegex: /^\d{8}$/ },
    Singapore: { phoneCode: "+65", postalCodeRegex: /^\d{6}$/, phoneNumberRegex: /^\d{8}$/ },
    Slovakia: { phoneCode: "+421", postalCodeRegex: /^\d{3}\s\d{2}$/, phoneNumberRegex: /^\d{9}$/ }, //000 00
    Slovenia: { phoneCode: "+386", postalCodeRegex: /^\d{4}$/, phoneNumberRegex: /^\d{8}$/ },// 4 Digits
    "Solomon Islands": { phoneCode: "+677", phoneNumberRegex: /^\d{5}$/ },
    Somalia: { phoneCode: "+252", phoneNumberRegex: /^\d{7,8}$/ },
    "South Africa": { phoneCode: "+27", postalCodeRegex: /^\d{4}$/, phoneNumberRegex: /^\d{9}$/ },
    "South Korea": { phoneCode: "+82", postalCodeRegex: /^\d{5}$/, phoneNumberRegex: /^\d{10,11}$/ },
    "South Sudan": { phoneCode: "+211", phoneNumberRegex: /^\d{7}$/ },
    Spain: { phoneCode: "+34", postalCodeRegex: /^\d{5}$/, phoneNumberRegex: /^\d{9}$/ },// 5 Digits
    "Sri Lanka": { phoneCode: "+94", postalCodeRegex: /^\d{5}$/, phoneNumberRegex: /^\d{9}$/ },// 5 Digits
    Sudan: { phoneCode: "+249", postalCodeRegex: /^\d{5}$/, phoneNumberRegex: /^\d{8,9}$/ },// 5 Digits
    Suriname: { phoneCode: "+597", phoneNumberRegex: /^\d{8}$/ },
    Sweden: { phoneCode: "+46", postalCodeRegex: /^\d{3}\s?\d{2}$/, phoneNumberRegex: /^\d{9,10}$/ }, // Ex:123 45
    Switzerland: { phoneCode: "+41", postalCodeRegex: /^\d{4}$/, phoneNumberRegex: /^\d{9}$/ }, // 4 Digits
    Syria: { phoneCode: "+963", postalCodeRegex: /^\d{4}$/, phoneNumberRegex: /^\d{9}$/ },// 4 Digits
    Taiwan: { phoneCode: "+886", postalCodeRegex: /^\d{3,5}$/, phoneNumberRegex: /^\d{8,9}$/ },// 3-5 Digits
    Tajikistan: { phoneCode: "+992", postalCodeRegex: /^\d{6}$/, phoneNumberRegex: /^\d{9}$/ },// 6 Digits
    Tanzania: { phoneCode: "+255", postalCodeRegex: /^\d{5}$/, phoneNumberRegex: /^\d{9}$/ },// 5 Digits
    Thailand: { phoneCode: "+66", postalCodeRegex: /^\d{5}$/, phoneNumberRegex: /^\d{9}$/ }, //5 Digits
    "Timor-Leste": { phoneCode: "+670", phoneNumberRegex: /^\d{7}$/ },
    Togo: { phoneCode: "+228", phoneNumberRegex: /^\d{8}$/ },
    Tonga: { phoneCode: "+676", phoneNumberRegex: /^\d{5}$/ },
    "Trinidad and Tobago": { phoneCode: "+1-868", phoneNumberRegex: /^\d{7}$/ },
    Tunisia: { phoneCode: "+216", postalCodeRegex: /^\d{4}$/, phoneNumberRegex: /^\d{8}$/ },
    Turkey: { phoneCode: "+90", postalCodeRegex: /^\d{5}$/, phoneNumberRegex: /^\d{10}$/ }, // 5 digits
    Turkmenistan: { phoneCode: "+993", postalCodeRegex: /^\d{6}$/, phoneNumberRegex: /^\d{8}$/ },// 6 digits
    Tuvalu: { phoneCode: "+688", phoneNumberRegex: /^\d{5}$/ },
    Uganda: { phoneCode: "+256", phoneNumberRegex: /^\d{9}$/ },
    Ukraine: { phoneCode: "+380", postalCodeRegex: /^\d{5}$/, phoneNumberRegex: /^\d{9}$/ },
    "United Arab Emirates": { phoneCode: "+971", phoneNumberRegex: /^\d{9}$/ },
    "United Kingdom": {
      phoneCode: "+44",
      postalCodeRegex: /^([A-Z]{1,2}\d[A-Z\d]?\s?\d[A-Z]{2})$/i,
      phoneNumberRegex: /^\d{10,11}$/,
    },// See regex example
    "United States": { phoneCode: "+1", postalCodeRegex: /^\d{5}(-\d{4})?$/, phoneNumberRegex: /^\d{10}$/ },
    Uruguay: { phoneCode: "+598", postalCodeRegex: /^\d{5}$/, phoneNumberRegex: /^\d{8}$/ },
    Uzbekistan: { phoneCode: "+998", postalCodeRegex: /^\d{6}$/, phoneNumberRegex: /^\d{9}$/ }, //6 Digits
    Vanuatu: { phoneCode: "+678", phoneNumberRegex: /^\d{7}$/ },
    Venezuela: { phoneCode: "+58", postalCodeRegex: /^\d{4}[A-Z]?$/, phoneNumberRegex: /^\d{10}$/ }, //4 Digits 1 Char
    Vietnam: { phoneCode: "+84", postalCodeRegex: /^\d{6}$/, phoneNumberRegex: /^\d{9,10}$/ }, //6 Digits
    Yemen: { phoneCode: "+967", phoneNumberRegex: /^\d{9}$/ },
    Zambia: { phoneCode: "+260", postalCodeRegex: /^\d{5}$/, phoneNumberRegex: /^\d{9}$/ }, //5 digits
    Zimbabwe: { phoneCode: "+263", phoneNumberRegex: /^\d{8}$/ },
  };
  
  export default countryData;