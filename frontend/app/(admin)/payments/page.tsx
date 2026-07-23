import PaymentSummaryCards from "@/components/payments/PaymentSummaryCards";
import PaymentsTable from "@/components/payments/PaymentsTable";
import AddPaymentModal from "@/components/payments/AddPaymentModal";

export default function PaymentsPage() {
  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-[#0B1F55]">Ödemeler</h2>
          <p className="mt-2 text-sm text-[#667085]">
            Hasta ödemelerini görüntüleyin, takip edin ve yönetin.
          </p>
        </div>

        <AddPaymentModal />
      </div>

      <PaymentSummaryCards />

      <PaymentsTable />
    </div>
  );
}
