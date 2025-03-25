// filepath: /Users/vathna/iCloud Drive (Archive)/Documents/SmartSched/frontend/src/i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
      // setting
      Setting: "Setting",
      Account: "Account",
      EditProfile: "You can edit your profile",
      DesktopNotification: "Desktop Notification",
      CustomizeDesktop: "Customize how you themes look on your devices",
      EmailNotification: "Email Notification",
      CustomizeEmail: "Customize how you themes look on your devices",
      Appearance: "Appearance",
      CustomizeAppearance: "Customize how you themes look on your devices",
      Language: "Language",
      TermsOfService: "Terms of Service",
      ReadTerms: "Read our terms of service",
      PrivacyPolicy: "Privacy Policy",
      ReadPrivacy: "Read our privacy policy",
      //terms of service
      TermsOfServiceTitle: "Terms of Service",
      AcceptanceOfTermsTitle: "Acceptance of Terms",
      AcceptanceOfTermsContent:
        "By accessing or using this calendar application, you acknowledge and agree to the terms and conditions set forth by the provider. These terms include the proper use of scheduling features, data privacy policies, and any updates made to improve functionality. Continued use of the calendar signifies your acceptance of these terms.",
      DescriptionOfServicesTitle: "Description of Services",
      DescriptionOfServicesContent:
        "Our calendar application provides users with an intuitive platform to schedule, manage, and track events efficiently. With features such as event reminders, recurring event scheduling, and synchronization across devices, users can stay organized effortlessly. The service also includes customizable notifications and sharing options, allowing seamless collaboration for personal and professional planning.",
      UserConductTitle: "User Conduct",
      UserConductContent:
        "Users are expected to use the calendar application responsibly and ethically. Any misuse, including but not limited to spamming events, sharing false information, or unauthorized access to others' schedules, is strictly prohibited. Users must respect privacy settings and refrain from any activities that may disrupt the functionality of the service. Violation of these guidelines may result in account suspension or termination.",
      // policy
      PrivacyPolicyTitle: "Privacy Policy",
      InformationWeCollectTitle: "Information We Collect",
      InformationWeCollectContent:
        "We collect and store user information to enhance the scheduling experience and improve the functionality of our calendar application. This includes personal details such as name and email, calendar events, device information, and usage data. If location access is enabled, we may use it for time zone adjustments and location-based reminders. All collected data is handled securely and in accordance with our privacy policy. Users have control over their data and can manage permissions at any time.",
      PrivacyAndDataSecurityTitle: "Privacy and Data Security",
      PrivacyAndDataSecurityContent:
        "We value your privacy and are committed to protecting your personal data. The calendar application collects and stores user information solely for enhancing the scheduling experience. All data is encrypted and handled in accordance with our privacy policy. Users are responsible for maintaining the confidentiality of their login credentials. Unauthorized access or data breaches should be reported immediately.",
      HowWeUseYourInformationTitle: "How We Use Your Information",
      HowWeUseYourInformationContent:
        "We use the information collected to provide, improve, and personalize your scheduling experience. This includes managing your calendar events, sending reminders, optimizing performance, and enhancing security. Location data (if enabled) helps with time zone adjustments and location-based notifications. We do not sell your personal data, and all information is handled in accordance with our privacy policy to ensure a secure and reliable service.",
      InformationSharingTitle: "Information Sharing",
      InformationSharingContent:
        "We do not sell, rent, or share your personal information with third parties for marketing purposes. Your data is only shared in limited cases, such as when integrating with third-party services (e.g., syncing with external calendars) with your permission. We may also share information when required by law, to protect our users, or to ensure the security of our services. All data sharing follows strict privacy and security measures to safeguard your information.",
      Back: "Back",
      //general
      ProfilePhoto: "Profile Photo",
      UploadImage: "Upload Image",
      Delete: "Delete",
      FullName: "Full Name",
      Gender: "Gender",
      SelectGender: "Select gender",
      Male: "Male",
      Female: "Female",
      Other: "Other",
      PreferNotToSay: "Prefer not to say",
      Email: "Email",
      InputYourEmail: "Input your email",
      Timezone: "Timezone",
      SelectTimezone: "Select Timezone",
      Update: "Update",
      DeleteAccount: "Delete Account",
      DeleteAccountWarning:
        "Once you delete your account and account data, there is no going back.",
      DeleteAccountConfirmation: "Delete your account and account data",
      ConfirmEmail: "Confirm Email",
      DeleteAccountButton: "Delete Account",
      General: "General",
      Account: "Account",
      Password: "Password",
      Session: "Session",
      ChangePassword: "Change Password",
      PasswordRequirements:
        "Your password must include at least one special character from !@#$%^&*(). Please update your password to meet this requirement.",
      CurrentPassword: "Current Password",
      NewPassword: "New Password",
      ConfirmPassword: "Confirm Password",
      PasswordErrorLength: "Password must be at least 8 characters long",
      PasswordErrorUpperCase:
        "Password must contain at least one uppercase letter",
      PasswordErrorNumber: "Password must contain at least one number",
      PasswordErrorSpecialChar: "Password must contain a specific symbol",
      PasswordErrorMatch: "Passwords do not match",
      Update: "Update",
      Platform: "Platform",
      Device: "Device",
      LastUsed: "Last Used",
      Access: "Access",
      CurrentSessions: "Current Sessions",
      Active: "Active",
      Revoke: "Revoke",
      SessionDescription:
        "Below are your recent sessions, revoke access to log out of the device",
      //sidebar
      Calendar: "Calendar",
      HistorySchedule: "History Schedule",
      MusicPlaylists: "Music Playlists",
      ContactUs: "Contact Us",
      Settings: "Settings",
      Logout: "Logout",
      //contact
      ContactUs: "Contact Us",
      ContactUsTitle: "Contact us",
      ContactUsDescription: "Reach out and we'll get in touch within 24 hours.",
      Title: "Title",
      EnterTitle: "Enter the title of your message...",
      Message: "Message",
      EnterMessage: "Enter your message",
      AgreeToPolicy: "You agree to our friendly",
      PrivacyPolicy: "privacy policy",
      SendMessages: "Send Messages",
      MessageSentSuccess: "Message sent successfully!",
    },
  },
  km: {
    translation: {
      //setting
      Setting: "ការកំណត់",
      Account: "គណនី",
      EditProfile: "អ្នកអាចកែប្រែប្រវត្តិរូបរបស់អ្នក",
      DesktopNotification: "ការជូនដំណឹងតាមផ្ទៃតុ",
      CustomizeDesktop: "ប្ដូរបែបផែនរបស់អ្នកនៅលើឧបករណ៍របស់អ្នក",
      EmailNotification: "ការជូនដំណឹងតាមអ៊ីមែល",
      CustomizeEmail: "ប្ដូរបែបផែនរបស់អ្នកនៅលើឧបករណ៍របស់អ្នក",
      Appearance: "រូបរាង",
      CustomizeAppearance: "ប្ដូរបែបផែនរបស់អ្នកនៅលើឧបករណ៍របស់អ្នក",
      Language: "ភាសា",
      TermsOfService: "លក្ខខណ្ឌសេវាកម្ម",
      ReadTerms: "អានលក្ខខណ្ឌសេវាកម្មរបស់យើង",
      PrivacyPolicy: "គោលការណ៍ភាពឯកជន",
      ReadPrivacy: "អានគោលការណ៍ភាពឯកជនរបស់យើង",
      //terms of service
      TermsOfServiceTitle: "លក្ខខណ្ឌសេវាកម្ម",
      AcceptanceOfTermsTitle: "ការទទួលយកលក្ខខណ្ឌ",
      AcceptanceOfTermsContent:
        "ដោយការចូលប្រើឬប្រើប្រាស់កម្មវិធីប្រតិទិននេះ អ្នកទទួលស្គាល់និងយល់ព្រមនឹងលក្ខខណ្ឌនានាដែលបានកំណត់ដោយអ្នកផ្តល់សេវា។ លក្ខខណ្ឌទាំងនេះរួមមានការប្រើប្រាស់ត្រឹមត្រូវនៃលក្ខណៈពិសេសនៃការកំណត់ពេលវេលា គោលការណ៍ភាពឯកជននៃទិន្នន័យ និងការធ្វើបច្ចុប្បន្នភាពណាមួយដើម្បីបង្កើនប្រសិទ្ធភាព។ ការបន្តប្រើប្រាស់ប្រតិទិននេះបញ្ជាក់ពីការទទួលយកលក្ខខណ្ឌទាំងនេះរបស់អ្នក។",
      DescriptionOfServicesTitle: "ការពិពណ៌នាសេវាកម្ម",
      DescriptionOfServicesContent:
        "កម្មវិធីប្រតិទិនរបស់យើងផ្តល់ឱ្យអ្នកប្រើប្រាស់នូវវេទិកាដែលងាយស្រួលក្នុងការកំណត់ពេលវេលា គ្រប់គ្រង និងតាមដានព្រឹត្តិការណ៍បានយ៉ាងមានប្រសិទ្ធភាព។ ជាមួយនឹងលក្ខណៈពិសេសដូចជាការរំលឹកព្រឹត្តិការណ៍ ការកំណត់ព្រឹត្តិការណ៍ដែលកើតឡើងជាថេរ និងការធ្វើសមកាលកម្មនៅលើឧបករណ៍ផ្សេងៗ អ្នកប្រើប្រាស់អាចរក្សារបៀបរៀបរយបានយ៉ាងងាយស្រួល។ សេវាកម្មនេះក៏រួមមានការជូនដំណឹងដែលអាចប្ដូរបែបផែនបាន និងជម្រើសក្នុងការចែករំលែក ដែលអនុញ្ញាតឱ្យមានការសហការយ៉ាងរលូនសម្រាប់ការធ្វើផែនការផ្ទាល់ខ្លួននិងវិជ្ជាជីវៈ។",
      UserConductTitle: "ឥរិយាបថអ្នកប្រើប្រាស់",
      UserConductContent:
        "អ្នកប្រើប្រាស់ត្រូវបានរំពឹងថានឹងប្រើប្រាស់កម្មវិធីប្រតិទិននេះដោយមានទំនួលខុសត្រូវនិងមានសីលធម៌។ ការប្រើប្រាស់ខុសរបៀបណាមួយ រួមមានការបញ្ចេញព្រឹត្តិការណ៍ច្រើនពេក ការចែករំលែកព័ត៌មានមិនពិត ឬការចូលប្រើដោយគ្មានការអនុញ្ញាតទៅកាន់កាលវិភាគរបស់អ្នកដទៃ ត្រូវបានហាមឃាត់យ៉ាងតឹងរឹង។ អ្នកប្រើប្រាស់ត្រូវគោរពការកំណត់ភាពឯកជន និងមិនធ្វើសកម្មភាពណាមួយដែលអាចរំខានដល់ប្រសិទ្ធភាពនៃសេវាកម្ម។ ការរំលោភលើគោលការណ៍ទាំងនេះអាចនាំឱ្យមានការផ្អាកឬបញ្ឈប់គណនី។",
      // policy
      PrivacyPolicyTitle: "គោលការណ៍ភាពឯកជន",
      InformationWeCollectTitle: "ព័ត៌មានដែលយើងប្រមូល",
      InformationWeCollectContent:
        "យើងប្រមូលនិងរក្សាទុកព័ត៌មានអ្នកប្រើប្រាស់ដើម្បីបង្កើនបទពិសោធន៍នៃការកំណត់ពេលវេលានិងបង្កើនប្រសិទ្ធភាពនៃកម្មវិធីប្រតិទិនរបស់យើង។ នេះរួមមានព័ត៌មានផ្ទាល់ខ្លួនដូចជាឈ្មោះនិងអ៊ីមែល ព្រឹត្តិការណ៍ប្រតិទិន ព័ត៌មានឧបករណ៍ និងទិន្នន័យការប្រើប្រាស់។ ប្រសិនបើការចូលប្រើទីតាំងត្រូវបានអនុញ្ញាត យើងអាចប្រើវាសម្រាប់ការកែសម្រួលតំបន់ពេលវេលានិងការរំលឹកផ្អែកលើទីតាំង។ ទិន្នន័យទាំងអស់ដែលបានប្រមូលត្រូវបានគ្រប់គ្រងដោយសុវត្ថិភាពនិងអនុលោមតាមគោលការណ៍ភាពឯកជនរបស់យើង។ អ្នកប្រើប្រាស់មានការគ្រប់គ្រងលើទិន្នន័យរបស់ពួកគេនិងអាចគ្រប់គ្រងការអនុញ្ញាតនៅពេលណាក៏បាន។",
      PrivacyAndDataSecurityTitle: "ភាពឯកជននិងសុវត្ថិភាពទិន្នន័យ",
      PrivacyAndDataSecurityContent:
        "យើងមានតម្លៃភាពឯកជនរបស់អ្នកនិងប្តេជ្ញាចិត្តក្នុងការការពារទិន្នន័យផ្ទាល់ខ្លួនរបស់អ្នក។ កម្មវិធីប្រតិទិនប្រមូលនិងរក្សាទុកព័ត៌មានអ្នកប្រើប្រាស់តែប៉ុណ្ណោះសម្រាប់ការបង្កើនបទពិសោធន៍នៃការកំណត់ពេលវេលា។ ទិន្នន័យទាំងអស់ត្រូវបានអ៊ិនគ្រីបនិងគ្រប់គ្រងអនុលោមតាមគោលការណ៍ភាពឯកជនរបស់យើង។ អ្នកប្រើប្រាស់មានកាតព្វកិច្ចក្នុងការរក្សាទុកភាពសម្ងាត់នៃឯកសារចូលរបស់ពួកគេ។ ការចូលប្រើដោយគ្មានការអនុញ្ញាតឬការបំពុលទិន្នន័យត្រូវបានរាយការណ៍ភ្លាមៗ។",
      HowWeUseYourInformationTitle: "យើងប្រើព័ត៌មានរបស់អ្នកយ៉ាងដូចម្តេច",
      HowWeUseYourInformationContent:
        "យើងប្រើព័ត៌មានដែលបានប្រមូលដើម្បីផ្តល់ បង្កើននិងប្ដូរតាមបំណងបទពិសោធន៍នៃការកំណត់ពេលវេលារបស់អ្នក។ នេះរួមមានការគ្រប់គ្រងព្រឹត្តិការណ៍ប្រតិទិនរបស់អ្នក ការផ្ញើការរំលឹក ការបង្កើនប្រសិទ្ធភាពនិងការកែលម្អសុវត្ថិភាព។ ទិន្នន័យទីតាំង (ប្រសិនបើបានអនុញ្ញាត) ជួយក្នុងការកែសម្រួលតំបន់ពេលវេលានិងការជូនដំណឹងផ្អែកលើទីតាំង។ យើងមិនលក់ទិន្នន័យផ្ទាល់ខ្លួនរបស់អ្នកទេ ហើយព័ត៌មានទាំងអស់ត្រូវបានគ្រប់គ្រងអនុលោមតាមគោលការណ៍ភាពឯកជនរបស់យើងដើម្បីធានាសេវាកម្មដែលមានសុវត្ថិភាពនិងអាចទុកចិត្តបាន។",
      InformationSharingTitle: "ការចែករំលែកព័ត៌មាន",
      InformationSharingContent:
        "យើងមិនលក់ ជួល ឬចែករំលែកព័ត៌មានផ្ទាល់ខ្លួនរបស់អ្នកជាមួយភាគីទីបីសម្រាប់គោលបំណងទីផ្សារទេ។ ទិន្នន័យរបស់អ្នកត្រូវបានចែករំលែកតែប៉ុណ្ណោះក្នុងករណីមានកំណត់ ដូចជាការរួមបញ្ចូលជាមួយសេវាកម្មភាគីទីបី (ឧ. ការធ្វើសមកាលកម្មជាមួយប្រតិទិនខាងក្រៅ) ដោយមានការអនុញ្ញាតពីអ្នក។ យើងក៏អាចចែករំលែកព័ត៌មាននៅពេលដែលចាំបាច់តាមច្បាប់ ដើម្បីការពារអ្នកប្រើប្រាស់របស់យើង ឬដើម្បីធានាសុវត្ថិភាពនៃសេវាកម្មរបស់យើង។ ការចែករំលែកទិន្នន័យទាំងអស់អនុលោមតាមវិធានការសុវត្ថិភាពនិងភាពឯកជនដើម្បីការពារព័ត៌មានរបស់អ្នក។",
      Back: "ត្រឡប់ក្រោយ",
      //general
      ProfilePhoto: "រូបថតប្រវត្តិរូប",
      UploadImage: "ដូររូបភាព",
      Delete: "លុប",
      FullName: "ឈ្មោះពេញ",
      Gender: "ភេទ",
      SelectGender: "ជ្រើសភេទ",
      Male: "ប្រុស",
      Female: "ស្រី",
      Other: "ផ្សេងទៀត",
      PreferNotToSay: "មិនចង់បញ្ជាក់",
      Email: "អ៊ីមែល",
      InputYourEmail: "បញ្ចូលEmailរបស់អ្នក",
      Timezone: "ល្វែងម៉ោង",
      SelectTimezone: "ជ្រើសល្វែងម៉ោង",
      Update: "ធ្វើបច្ចុប្បន្នភាព",
      DeleteAccount: "លុបគណនី",
      DeleteAccountWarning:
        "បន្ទាប់ពីអ្នកលុបគណនីនិងទិន្នន័យគណនីរបស់អ្នក មិនអាចត្រឡប់វិញបានទេ។",
      DeleteAccountConfirmation: "លុបគណនីនិងទិន្នន័យគណនីរបស់អ្នក",
      ConfirmEmail: "បញ្ជាក់Email",
      DeleteAccountButton: "លុបគណនី",
      General: "ទូទៅ",
      Account: "គណនី",
      Password: "ពាក្យសម្ងាត់",
      Session: "អ្នកប្រើប្រាស់",
      ChangePassword: "ផ្លាស់ប្តូរពាក្យសម្ងាត់",
      PasswordRequirements:
        "ពាក្យសម្ងាត់របស់អ្នកត្រូវតែមានតួអក្សរពិសេសយ៉ាងហោចណាស់មួយពី !@#$%^&*(). សូមធ្វើបច្ចុប្បន្នភាពពាក្យសម្ងាត់របស់អ្នកដើម្បីបំពេញតាមតម្រូវការនេះ។",
      CurrentPassword: "ពាក្យសម្ងាត់បច្ចុប្បន្ន",
      NewPassword: "ពាក្យសម្ងាត់ថ្មី",
      ConfirmPassword: "បញ្ជាក់ពាក្យសម្ងាត់",
      PasswordErrorLength: "ពាក្យសម្ងាត់ត្រូវមានយ៉ាងហោចណាស់ 8 តួអក្សរ",
      PasswordErrorUpperCase: "ពាក្យសម្ងាត់ត្រូវមានតួអក្សរធំយ៉ាងហោចណាស់មួយ",
      PasswordErrorNumber: "ពាក្យសម្ងាត់ត្រូវមានលេខយ៉ាងហោចណាស់មួយ",
      PasswordErrorSpecialChar: "ពាក្យសម្ងាត់ត្រូវមានតួអក្សរពិសេស",
      PasswordErrorMatch: "ពាក្យសម្ងាត់មិនត្រូវគ្នា",
      Update: "ធ្វើបច្ចុប្បន្នភាព",
      Platform: "វេទិកា",
      Device: "ឧបករណ៍",
      LastUsed: "ប្រើប្រាស់ចុងក្រោយ",
      Access: "ការចូលប្រើ",
      CurrentSessions: "សម័យបច្ចុប្បន្ន",
      Active: "សកម្ម",
      Revoke: "ដកហូត",
      SessionDescription:
        "ខាងក្រោមនេះគឺជាសម័យថ្មីៗរបស់អ្នក ដកហូតការចូលប្រើដើម្បីចាកចេញពីឧបករណ៍",
      //sidebar
      Calendar: "ប្រតិទិន",
      HistorySchedule: "ប្រវត្តិការកំណត់ពេលវេលា",
      MusicPlaylists: "បញ្ជីចម្រៀង",
      ContactUs: "ទាក់ទងមកយើង",
      Settings: "ការកំណត់",
      Logout: "ចាកចេញ",
      //contact
      ContactUs: "ទាក់ទងមកយើង",
      ContactUsTitle: "ទាក់ទងមកយើង",
      ContactUsDescription: "ទាក់ទងមកយើងហើយយើងនឹងទាក់ទងវិញក្នុងរយៈពេល 24 ម៉ោង។",
      Title: "ចំណងជើង",
      EnterTitle: "បញ្ចូលចំណងជើងនៃសាររបស់អ្នក...",
      Message: "សារ",
      EnterMessage: "បញ្ចូលសាររបស់អ្នក",
      AgreeToPolicy: "អ្នកយល់ព្រមនឹង",
      PrivacyPolicy: "គោលការណ៍ភាពឯកជន",
      SendMessages: "ផ្ញើសារ",
      MessageSentSuccess: "សារបានផ្ញើដោយជោគជ័យ!",
    },
  },
};

i18n.use(initReactI18next).init({
  resources,
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
