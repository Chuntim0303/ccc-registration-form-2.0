
const countryCodes = [
  { code: '1', flag: '🇺🇸' }, // United States
  { code: '1', flag: '🇨🇦' }, // Canada (shares +1)
  { code: '7', flag: '🇷🇺' }, // Russia
  { code: '7', flag: '🇰🇿' }, // Kazakhstan (shares +7)
  { code: '20', flag: '🇪🇬' }, // Egypt
  { code: '27', flag: '🇿🇦' }, // South Africa
  { code: '30', flag: '🇬🇷' }, // Greece
  { code: '31', flag: '🇳🇱' }, // Netherlands
  { code: '32', flag: '🇧🇪' }, // Belgium
  { code: '33', flag: '🇫🇷' }, // France
  { code: '34', flag: '🇪🇸' }, // Spain
  { code: '36', flag: '🇭🇺' }, // Hungary
  { code: '39', flag: '🇮🇹' }, // Italy
  { code: '40', flag: '🇷🇴' }, // Romania
  { code: '41', flag: '🇨🇭' }, // Switzerland
  { code: '43', flag: '🇦🇹' }, // Austria
  { code: '44', flag: '🇬🇧' }, // United Kingdom
  { code: '45', flag: '🇩🇰' }, // Denmark
  { code: '46', flag: '🇸🇪' }, // Sweden
  { code: '47', flag: '🇳🇴' }, // Norway
  { code: '48', flag: '🇵🇱' }, // Poland
  { code: '49', flag: '🇩🇪' }, // Germany
  { code: '51', flag: '🇵🇪' }, // Peru
  { code: '52', flag: '🇲🇽' }, // Mexico
  { code: '53', flag: '🇨🇺' }, // Cuba
  { code: '54', flag: '🇦🇷' }, // Argentina
  { code: '55', flag: '🇧🇷' }, // Brazil
  { code: '56', flag: '🇨🇱' }, // Chile
  { code: '57', flag: '🇨🇴' }, // Colombia
  { code: '58', flag: '🇻🇪' }, // Venezuela
  { code: '60', flag: '🇲🇾' }, // Malaysia
  { code: '61', flag: '🇦🇺' }, // Australia
  { code: '62', flag: '🇮🇩' }, // Indonesia
  { code: '63', flag: '🇵🇭' }, // Philippines
  { code: '64', flag: '🇳🇿' }, // New Zealand
  { code: '65', flag: '🇸🇬' }, // Singapore
  { code: '66', flag: '🇹🇭' }, // Thailand
  { code: '81', flag: '🇯🇵' }, // Japan
  { code: '82', flag: '🇰🇷' }, // South Korea
  { code: '84', flag: '🇻🇳' }, // Vietnam
  { code: '86', flag: '🇨🇳' }, // China
  { code: '90', flag: '🇹🇷' }, // Turkey
  { code: '91', flag: '🇮🇳' }, // India
  { code: '92', flag: '🇵🇰' }, // Pakistan
  { code: '93', flag: '🇦🇫' }, // Afghanistan
  { code: '94', flag: '🇱🇰' }, // Sri Lanka
  { code: '95', flag: '🇲🇲' }, // Myanmar
  { code: '98', flag: '🇮🇷' }, // Iran
  { code: '211', flag: '🇸🇸' }, // South Sudan
  { code: '212', flag: '🇲🇦' }, // Morocco
  { code: '213', flag: '🇩🇿' }, // Algeria
  { code: '216', flag: '🇹🇳' }, // Tunisia
  { code: '218', flag: '🇱🇾' }, // Libya
  { code: '220', flag: '🇬🇲' }, // Gambia
  { code: '221', flag: '🇸🇳' }, // Senegal
  { code: '222', flag: '🇲🇷' }, // Mauritania
  { code: '223', flag: '🇲🇱' }, // Mali
  { code: '224', flag: '🇬🇳' }, // Guinea
  { code: '225', flag: '🇨🇮' }, // Ivory Coast
  { code: '226', flag: '🇧🇫' }, // Burkina Faso
  { code: '227', flag: '🇳🇪' }, // Niger
  { code: '228', flag: '🇹🇬' }, // Togo
  { code: '229', flag: '🇧🇯' }, // Benin
  { code: '230', flag: '🇲🇺' }, // Mauritius
  { code: '231', flag: '🇱🇷' }, // Liberia
  { code: '232', flag: '🇸🇱' }, // Sierra Leone
  { code: '233', flag: '🇬🇭' }, // Ghana
  { code: '234', flag: '🇳🇬' }, // Nigeria
  { code: '235', flag: '🇹🇩' }, // Chad
  { code: '236', flag: '🇨🇫' }, // Central African Republic
  { code: '237', flag: '🇨🇲' }, // Cameroon
  { code: '238', flag: '🇨🇻' }, // Cape Verde
  { code: '239', flag: '🇸🇹' }, // São Tomé and Príncipe
  { code: '240', flag: '🇬🇶' }, // Equatorial Guinea
  { code: '241', flag: '🇬🇦' }, // Gabon
  { code: '242', flag: '🇨🇬' }, // Republic of the Congo
  { code: '243', flag: '🇨🇩' }, // DR Congo
  { code: '244', flag: '🇦🇴' }, // Angola
  { code: '245', flag: '🇬🇼' }, // Guinea-Bissau
  { code: '246', flag: '🇮🇴' }, // British Indian Ocean Territory
  { code: '247', flag: '🇦🇨' }, // Ascension Island
  { code: '248', flag: '🇸🇨' }, // Seychelles
  { code: '249', flag: '🇸🇩' }, // Sudan
  { code: '250', flag: '🇷🇼' }, // Rwanda
  { code: '251', flag: '🇪🇹' }, // Ethiopia
  { code: '252', flag: '🇸🇴' }, // Somalia
  { code: '253', flag: '🇩🇯' }, // Djibouti
  { code: '254', flag: '🇰🇪' }, // Kenya
  { code: '255', flag: '🇹🇿' }, // Tanzania
  { code: '256', flag: '🇺🇬' }, // Uganda
  { code: '257', flag: '🇧🇮' }, // Burundi
  { code: '258', flag: '🇲🇿' }, // Mozambique
  { code: '260', flag: '🇿🇲' }, // Zambia
  { code: '261', flag: '🇲🇬' }, // Madagascar
  { code: '262', flag: '🇾🇹' }, // Mayotte
  { code: '262', flag: '🇷🇪' }, // Réunion (shares +262)
  { code: '263', flag: '🇿🇼' }, // Zimbabwe
  { code: '264', flag: '🇳🇦' }, // Namibia
  { code: '265', flag: '🇲🇼' }, // Malawi
  { code: '266', flag: '🇱🇸' }, // Lesotho
  { code: '267', flag: '🇧🇼' }, // Botswana
  { code: '268', flag: '🇸🇿' }, // Eswatini
  { code: '269', flag: '🇰🇲' }, // Comoros
  { code: '290', flag: '🇸🇭' }, // Saint Helena
  { code: '291', flag: '🇪🇷' }, // Eritrea
  { code: '297', flag: '🇦🇼' }, // Aruba
  { code: '298', flag: '🇫🇴' }, // Faroe Islands
  { code: '299', flag: '🇬🇱' }, // Greenland
  { code: '350', flag: '🇬🇮' }, // Gibraltar
  { code: '351', flag: '🇵🇹' }, // Portugal
  { code: '352', flag: '🇱🇺' }, // Luxembourg
  { code: '353', flag: '🇮🇪' }, // Ireland
  { code: '354', flag: '🇮🇸' }, // Iceland
  { code: '355', flag: '🇦🇱' }, // Albania
  { code: '356', flag: '🇲🇹' }, // Malta
  { code: '357', flag: '🇨🇾' }, // Cyprus
  { code: '358', flag: '🇫🇮' }, // Finland
  { code: '359', flag: '🇧🇬' }, // Bulgaria
  { code: '370', flag: '🇱🇹' }, // Lithuania
  { code: '371', flag: '🇱🇻' }, // Latvia
  { code: '372', flag: '🇪🇪' }, // Estonia
  { code: '373', flag: '🇲🇩' }, // Moldova
  { code: '374', flag: '🇦🇲' }, // Armenia
  { code: '375', flag: '🇧🇾' }, // Belarus
  { code: '376', flag: '🇦🇩' }, // Andorra
  { code: '377', flag: '🇲🇨' }, // Monaco
  { code: '378', flag: '🇸🇲' }, // San Marino
  { code: '379', flag: '🇻🇦' }, // Vatican City
  { code: '380', flag: '🇺🇦' }, // Ukraine
  { code: '381', flag: '🇷🇸' }, // Serbia
  { code: '382', flag: '🇲🇪' }, // Montenegro
  { code: '383', flag: '🇽🇰' }, // Kosovo
  { code: '385', flag: '🇭🇷' }, // Croatia
  { code: '386', flag: '🇸🇮' }, // Slovenia
  { code: '387', flag: '🇧🇦' }, // Bosnia and Herzegovina
  { code: '389', flag: '🇲🇰' }, // North Macedonia
  { code: '420', flag: '🇨🇿' }, // Czech Republic
  { code: '421', flag: '🇸🇰' }, // Slovakia
  { code: '423', flag: '🇱🇮' }, // Liechtenstein
  { code: '500', flag: '🇫🇰' }, // Falkland Islands
  { code: '501', flag: '🇧🇿' }, // Belize
  { code: '502', flag: '🇬🇹' }, // Guatemala
  { code: '503', flag: '🇸🇻' }, // El Salvador
  { code: '504', flag: '🇭🇳' }, // Honduras
  { code: '505', flag: '🇳🇮' }, // Nicaragua
  { code: '506', flag: '🇨🇷' }, // Costa Rica
  { code: '507', flag: '🇵🇦' }, // Panama
  { code: '508', flag: '🇵🇲' }, // Saint Pierre and Miquelon
  { code: '509', flag: '🇭🇹' }, // Haiti
  { code: '590', flag: '🇬🇵' }, // Guadeloupe
  { code: '591', flag: '🇧🇴' }, // Bolivia
  { code: '592', flag: '🇬🇾' }, // Guyana
  { code: '593', flag: '🇪🇨' }, // Ecuador
  { code: '594', flag: '🇬🇫' }, // French Guiana
  { code: '595', flag: '🇵🇾' }, // Paraguay
  { code: '596', flag: '🇲🇶' }, // Martinique
  { code: '597', flag: '🇸🇷' }, // Suriname
  { code: '598', flag: '🇺🇾' }, // Uruguay
  { code: '599', flag: '🇨🇼' }, // Curaçao
  { code: '670', flag: '🇹🇱' }, // East Timor
  { code: '672', flag: '🇳🇫' }, // Norfolk Island
  { code: '673', flag: '🇧🇳' }, // Brunei
  { code: '674', flag: '🇳🇷' }, // Nauru
  { code: '675', flag: '🇵🇬' }, // Papua New Guinea
  { code: '676', flag: '🇹🇴' }, // Tonga
  { code: '677', flag: '🇸🇧' }, // Solomon Islands
  { code: '678', flag: '🇻🇺' }, // Vanuatu
  { code: '679', flag: '🇫🇯' }, // Fiji
  { code: '680', flag: '🇵🇼' }, // Palau
  { code: '681', flag: '🇼🇫' }, // Wallis and Futuna
  { code: '682', flag: '🇨🇰' }, // Cook Islands
  { code: '683', flag: '🇳🇺' }, // Niue
  { code: '685', flag: '🇼🇸' }, // Samoa
  { code: '686', flag: '🇰🇮' }, // Kiribati
  { code: '687', flag: '🇳🇨' }, // New Caledonia
  { code: '688', flag: '🇹🇻' }, // Tuvalu
  { code: '689', flag: '🇵🇫' }, // French Polynesia
  { code: '690', flag: '🇹🇰' }, // Tokelau
  { code: '691', flag: '🇫🇲' }, // Micronesia
  { code: '692', flag: '🇲🇭' }, // Marshall Islands
  { code: '850', flag: '🇰🇵' }, // North Korea
  { code: '852', flag: '🇭🇰' }, // Hong Kong
  { code: '853', flag: '🇲🇴' }, // Macau
  { code: '855', flag: '🇰🇭' }, // Cambodia
  { code: '856', flag: '🇱🇦' }, // Laos
  { code: '880', flag: '🇧🇩' }, // Bangladesh
  { code: '886', flag: '🇹🇼' }, // Taiwan
  { code: '960', flag: '🇲🇻' }, // Maldives
  { code: '961', flag: '🇱🇧' }, // Lebanon
  { code: '962', flag: '🇯🇴' }, // Jordan
  { code: '963', flag: '🇸🇾' }, // Syria
  { code: '964', flag: '🇮🇶' }, // Iraq
  { code: '965', flag: '🇰🇼' }, // Kuwait
  { code: '966', flag: '🇸🇦' }, // Saudi Arabia
  { code: '967', flag: '🇾🇪' }, // Yemen
  { code: '968', flag: '🇴🇲' }, // Oman
  { code: '970', flag: '🇵🇸' }, // Palestine
  { code: '971', flag: '🇦🇪' }, // United Arab Emirates
  { code: '972', flag: '🇮🇱' }, // Israel
  { code: '973', flag: '🇧🇭' }, // Bahrain
  { code: '974', flag: '🇶🇦' }, // Qatar
  { code: '975', flag: '🇧🇹' }, // Bhutan
  { code: '976', flag: '🇲🇳' }, // Mongolia
  { code: '977', flag: '🇳🇵' }, // Nepal
  { code: '992', flag: '🇹🇯' }, // Tajikistan
  { code: '993', flag: '🇹🇲' }, // Turkmenistan
  { code: '994', flag: '🇦🇿' }, // Azerbaijan
  { code: '995', flag: '🇬🇪' }, // Georgia
  { code: '996', flag: '🇰🇬' }, // Kyrgyzstan
  { code: '998', flag: '🇺🇿' }, // Uzbekistan
  { code: '1242', flag: '🇧🇸' }, // Bahamas
  { code: '1246', flag: '🇧🇧' }, // Barbados
  { code: '1264', flag: '🇦🇮' }, // Anguilla
  { code: '1268', flag: '🇦🇬' }, // Antigua and Barbuda
  { code: '1284', flag: '🇻🇬' }, // British Virgin Islands
  { code: '1340', flag: '🇻🇮' }, // U.S. Virgin Islands
  { code: '1345', flag: '🇰🇾' }, // Cayman Islands
  { code: '1441', flag: '🇧🇲' }, // Bermuda
  { code: '1473', flag: '🇬🇩' }, // Grenada
  { code: '1649', flag: '🇹🇨' }, // Turks and Caicos Islands
  { code: '1664', flag: '🇲🇸' }, // Montserrat
  { code: '1670', flag: '🇲🇵' }, // Northern Mariana Islands
  { code: '1671', flag: '🇬🇺' }, // Guam
  { code: '1684', flag: '🇦🇸' }, // American Samoa
  { code: '1721', flag: '🇸🇽' }, // Sint Maarten
  { code: '1758', flag: '🇱🇨' }, // Saint Lucia
  { code: '1767', flag: '🇩🇲' }, // Dominica
  { code: '1784', flag: '🇻🇨' }, // Saint Vincent and the Grenadines
  { code: '1787', flag: '🇵🇷' }, // Puerto Rico
  { code: '1809', flag: '🇩🇴' }, // Dominican Republic
  { code: '1868', flag: '🇹🇹' }, // Trinidad and Tobago
  { code: '1869', flag: '🇰🇳' }, // Saint Kitts and Nevis
  { code: '1876', flag: '🇯🇲' }, // Jamaica
  { code: '6723', flag: '🇦🇶' } // Antarctica (no standard flag)
].sort((a, b) => parseInt(a.code) - parseInt(b.code));

export default countryCodes;
