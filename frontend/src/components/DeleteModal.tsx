interface Props {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    employeeName: string;
}

export default function DeleteModal({ isOpen, onClose, onConfirm, employeeName }: Props) {
    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4" onClick={onClose}>
            <div className="bg-white rounded-xl p-6 w-full max-w-md shadow-2xl" onClick={e => e.stopPropagation()}>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Delete Employee?</h3>
                <p className="text-gray-600 mb-6 leading-relaxed">
                    Are you sure you want to delete <strong className="text-gray-800">{employeeName}</strong>?
                    This action cannot be undone.
                </p>

                <div className="flex gap-3 justify-end">
                    <button
                        onClick={onClose}
                        className="px-5 py-2.5 text-gray-700 hover:bg-gray-100 rounded-lg font-medium transition"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-5 py-2.5 bg-red-500 text-white rounded-lg hover:bg-red-600 font-medium transition"
                    >
                        Delete
                    </button>
                </div>
            </div>
        </div>
    );
}
