import { IProduct } from "../../../global/interfaces";

interface ReadOnlyRowProps {
  product: IProduct
  handleEditClick(event: any, product: IProduct): void
  handleDeleteClick(productId: string): void
}

export default function ReadOnlyRow({ product, handleEditClick, handleDeleteClick }: ReadOnlyRowProps) {
  return (
    <tr key={Math.random()}>
      <td>
        <img
          alt='productImage'
          src={product.image}
          width={100}
          height={100}
        />
      </td>
      <td>{product.title}</td>
      <td>{product.price}</td>
      <td>{product.quantity}</td>
      <td>
        <button
          type='button'
          onClick={(event) => handleEditClick(event, product)}
        >
          Edit
        </button>
        <button
          type='button'
          onClick={() => handleDeleteClick(product._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  )
}