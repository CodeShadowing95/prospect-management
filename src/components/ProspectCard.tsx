import { FinanceRequest } from "../types"

const ProspectCard = ({ financeRequest, handleDelete, handleEdit }: { financeRequest: FinanceRequest, handleDelete: (id: number) => void, handleEdit: (id: number) => void }) => {
  return (
    <div className="w-[325px] max-w-[325px] border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition-all duration-300">
        
        <div className="w-full flex justify-between items-start gap-4">
            <div className="flex gap-2 items-center">
                <img className="w-10 h-10 rounded-full" src={financeRequest.avatar} alt="Rounded avatar" />
                <div className="flex flex-col">
                    <p className="mb-1 text-sm font-medium text-gray-900">{financeRequest.nom}</p>
                    <span className="text-xs text-gray-500">Demandé le {financeRequest.date}</span>
                </div>
            </div>
            <div className="flex items-center gap-2">
                <button className="w-6 h-6 flex justify-center items-center rounded-lg border border-gray-200 hover:bg-gray-100" onClick={() => handleEdit(financeRequest.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0 align-middle text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21.174 6.812a1 1 0 0 0-3.986-3.987L3.842 16.174a2 2 0 0 0-.5.83l-1.321 4.352a.5.5 0 0 0 .623.622l4.353-1.32a2 2 0 0 0 .83-.497z"/><path d="m15 5 4 4"/></svg>
                </button>
                <button className="w-6 h-6 flex justify-center items-center rounded-lg border border-gray-200 hover:bg-gray-100" onClick={() => handleDelete(financeRequest.id)}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0 align-middle text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"/><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"/><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"/><line x1="10" x2="10" y1="11" y2="17"/><line x1="14" x2="14" y1="11" y2="17"/></svg>
                </button>
            </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-blue-500 to-teal-500 my-4"></div>

        <div className="flex justify-between items-center gap-4">
            <div className="flex justify-center items-center gap-2 px-2 py-1 border border-gray-200 rounded-xl text-gray-800">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0 align-middle text-amber-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M11 15h2a2 2 0 1 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 17"/><path d="m7 21 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a2 2 0 0 0-2.75-2.91l-4.2 3.9"/><path d="m2 16 6 6"/><circle cx="16" cy="9" r="2.9"/><circle cx="6" cy="5" r="3"/></svg>
                <span className="text-xs font-semibold">{financeRequest.montant} €</span>
            </div>

            <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${financeRequest.statut === 'En attente' ? 'bg-yellow-700' : financeRequest.statut === 'Confirmé' ? 'bg-green-700' : 'bg-red-700'}`}></div>
                    <p className={`text-xs font-medium ${financeRequest.statut === 'En attente' ? 'text-yellow-700' : financeRequest.statut === 'Confirmé' ? 'text-green-700' : 'text-red-700'}`}>{financeRequest.statut}</p>
                </div>
                <button className="w-6 h-6 flex justify-center items-center rounded-lg border border-gray-200 hover:bg-gray-100">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0 align-middle text-gray-600" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="1"/><circle cx="19" cy="12" r="1"/><circle cx="5" cy="12" r="1"/></svg>
                </button>
            </div>
        </div>
    </div>
  )
}

export default ProspectCard