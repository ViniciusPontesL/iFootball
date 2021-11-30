import { IPurchases } from "../../../global/interfaces";

interface ReadOnlyRowProps {
  purchases: IPurchases
  handleEditClick(event: any, user: IPurchases): void
  handleDeleteClick(purchasesId: string): void
}

export default function ReadOnlyRow({ purchases, handleEditClick, handleDeleteClick }: ReadOnlyRowProps) {
  return (
    <tr key={purchases._id}>
      <td>{purchases.endereco}</td>
      <td>{purchases.telefone}</td>
      <td>{purchases.userId}</td>
      <td>{purchases.selectedProductIds}</td>
      <td>{purchases.selectedProductQtds}</td>
      <td>
        <button
          type='button'
          onClick={(event) => handleEditClick(event, purchases)}
        >
          Edit
        </button>
        <button
          type='button'
          onClick={() => handleDeleteClick(purchases._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  )
}