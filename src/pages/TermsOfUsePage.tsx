import LegalDocumentPage from '@/pages/LegalDocumentPage';
import { termsOfUseContent } from '@/content/legal';

const TermsOfUsePage = () => {
  return <LegalDocumentPage legalDocument={termsOfUseContent} />;
};

export default TermsOfUsePage;
