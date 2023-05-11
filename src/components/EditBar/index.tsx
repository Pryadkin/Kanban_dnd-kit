interface Props {
    onEdit: () => void,
    onDelete: () => void
}

export const EditBar = ({
    onEdit,
    onDelete,
}: Props) => (
    <div>
        <button
            type="button"
            onClick={onEdit}
        >
            Edit
        </button>

        <button
            type="button"
            onClick={onDelete}
        >
            Delete
        </button>
    </div>
)
