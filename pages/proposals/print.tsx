import PageHeader from "@/components/layouts/PageHeader";
import { PageContent } from "@/components/layouts/PageContent";
import { PrintForm } from "@/components/proposals/PrintForm";

export default function PropoalPrintPage() {
  return (
    <div>
      <PageHeader
        title="Print Proposal"
        hasSearch={false}
      />

      <PageContent>
        <PrintForm />
      </PageContent>
    </div>
  );
}
