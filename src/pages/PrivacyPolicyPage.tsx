import LegalDocumentPage from '@/pages/LegalDocumentPage';
import { privacyPolicyContent } from '@/content/legal';

const PrivacyPolicyPage = () => {
  return <LegalDocumentPage legalDocument={privacyPolicyContent} />;
};

export default PrivacyPolicyPage;
