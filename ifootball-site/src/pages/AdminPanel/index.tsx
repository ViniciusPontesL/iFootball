import ProductTable from "../../components/sections/productTable";
import PurchasesTable from "../../components/sections/purchasesTable";
import UserTable from "../../components/sections/userTable";

export default function AdminPanel() {
  return (
    <>
      <PurchasesTable />
      <ProductTable />
      <UserTable />
    </>
  )
}