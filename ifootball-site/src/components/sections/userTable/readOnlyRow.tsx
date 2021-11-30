import { IUser } from "../../../global/interfaces";

interface ReadOnlyRowProps {
  user: IUser
  handleEditClick(event: any, user: IUser): void
  handleDeleteClick(userId: string): void
}

export default function ReadOnlyRow({ user, handleEditClick, handleDeleteClick }: ReadOnlyRowProps) {
  return (
    <tr key={user._id}>
      <td>{user.name}</td>
      <td>{user.email}</td>
      <td>{user.cpf}</td>
      <td>**************</td>
      <td>
        <button
          type='button'
          onClick={(event) => handleEditClick(event, user)}
        >
          Edit
        </button>
        <button
          type='button'
          onClick={() => handleDeleteClick(user._id)}
        >
          Delete
        </button>
      </td>
    </tr>
  )
}