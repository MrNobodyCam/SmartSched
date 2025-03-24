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
