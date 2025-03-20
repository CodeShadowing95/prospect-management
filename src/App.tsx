import { useEffect, useState } from 'react'
import ProspectCard from './components/ProspectCard'
import { FinanceRequest } from './types'
import { avatarz, financesRequests } from './constants';
import ModalDialog from './components/ModalDialog';

function App() {
  const storedData = localStorage.getItem('financesRequests');
  const data: FinanceRequest[] = storedData ? JSON.parse(storedData) : financesRequests;

  const [financeReq, setFinanceReq] = useState<FinanceRequest[]>(data);
  const financeReqTemp = [...financesRequests];
  const [toggleModal, setToggleModal] = useState<boolean>(false);

  const [deleteCard, setDeleteCard] = useState(0);
  const [editCard, setEditCard] = useState(0);
  
  const [formData, setFormData] = useState<FinanceRequest>({
    id: Math.floor(Math.random() * 1000000),
    nom: '',
    statut: '',
    montant: 0,
    date: '',
    avatar: avatarz[Math.floor(Math.random() * avatarz.length)]
  });

  const handleModalAdd = () => {
    setToggleModal(true);
    setEditCard(0);
  }

  const handleAddModifyProspect = (data: FinanceRequest) => {
    if (editCard !== 0) {
      setFinanceReq(financeReq.map(financeRequest => financeRequest.id === editCard ? data : financeRequest));
      setEditCard(0);
      return;
    }
    setFinanceReq([...financeReq, data]);
    setToggleModal(false);
  }

  const handleDelete = (id: number) => {
    setFinanceReq(financeReq.filter(financeRequest => financeRequest.id !== id));
  }

  const handleEdit = (id: number) => {
    setEditCard(id);
    setToggleModal(true);
  }

  const handleSearch = (searchTerm: string) => {
    if (searchTerm) {
      setFinanceReq(financeReqTemp.filter(financeRequest => financeRequest.nom.toLowerCase().includes(searchTerm.toLowerCase())));
    } else {
      setFinanceReq(financeReqTemp);
    }
  }

  
  useEffect(() => {
    localStorage.setItem('financesRequests', JSON.stringify(financeReq));
  }, [financeReq]);

  useEffect(() => {
    if (deleteCard) {
      handleDelete(deleteCard);
      setDeleteCard(0);
    }
  }, [deleteCard]);

  useEffect(() => {
    if (editCard) {
      handleEdit(editCard);
    }
  }, [editCard]);

  useEffect(() => {
    if (!toggleModal) {
      setFormData({ ...formData, id: Math.floor(Math.random() * 1000000), avatar: avatarz[Math.floor(Math.random() * avatarz.length)], nom: '', statut: '', montant: 0, date: '' });
    }
  }, []);
  

  return (
    <div className="max-w-[100dvw] h-[100dvh] bg-gray-50 flex flex-col items-center pt-5 relative">
      {/* Titre */}
      <div className='w-full flex items-center flex-col'>
        <h1 className="text-5xl font-bold tracking-wide text-blue-500 text-center">Leads Management</h1>
        <p className="text-lg text-gray-600 mt-4 text-center">
          La gestion de vos prospects n'a jamais été aussi facile et rapide
        </p>
      </div>
      
      {/* Ajouter et rechercher */}
      <div className="w-full flex justify-end items-center gap-2 mt-20 px-10">
        <div className="relative w-1/2 md:w-1/3">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
          </div>
          <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Rechercher un prospect" onChange={(e) => handleSearch(e.target.value)} />
        </div>
        <button type="button" className="flex justify-center items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={handleModalAdd}>
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0 align-middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
          Ajouter
        </button>
      </div>
      
      {/* Affichage des prospects */}
      <div className="w-full flex flex-wrap px-10 mt-4 rounded-lg gap-4">
        {financeReq.map((item) => (
          <ProspectCard financeRequest={item} handleDelete={setDeleteCard} handleEdit={setEditCard} />
        ))}
      </div>

      <ModalDialog isOpen={toggleModal} setIsOpen={setToggleModal}>
        <div className="w-full flex flex-col gap-1 p-4">
          <p className="text-xl font-semibold tracking-wide text-gray-800">{editCard !== 0 ? 'Modifier un prospect' : 'Ajouter un prospect'}</p>
          <p className="text-sm text-gray-600">
            {editCard !== 0 ? 'Modifiez le prospect ci-dessous' : 'Remplissez le formulaire ci-dessous pour ajouter un nouveau prospect'}
          </p>
          
          <div className="w-full h-px bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 my-4"></div>

          <div className="flex flex-col gap-3">
            <input
              type="text"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              value={editCard !== 0 ? financeReq.find(financeRequest => financeRequest.id === editCard)?.nom : formData.nom}
              placeholder="Nom"
              onChange={(e) => setFormData({...formData, nom: e.target.value})}
            />
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              onChange={(e) => setFormData({...formData, statut: e.target.value})}
              value={editCard !== 0 ? financeReq.find(financeRequest => financeRequest.id === editCard)?.statut : formData.statut}
            >
              <option value="Confirmé" selected>Confirmé</option>
              <option value="En attente">En attente</option>
              <option value="Refusé">Refusé</option>
            </select>
            <input
              type="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              placeholder="Date"
              onChange={(e) => setFormData({...formData, date: e.target.value})}
              value={editCard !== 0 ? financeReq.find(financeRequest => financeRequest.id === editCard)?.date : formData.date}
            />
            <input
              type="number"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              placeholder="Montant"
              onChange={(e) => setFormData({...formData, montant: Number(e.target.value)})}
              value={editCard !== 0 ? financeReq.find(financeRequest => financeRequest.id === editCard)?.montant : formData.montant}
            />
          </div>

          <div className="w-full flex justify-center items-center">
            <button className="flex items-center justify-center mt-4 max-w-xl bg-gradient-to-r from-purple-500 to-pink-500 hover:from-pink-500 hover:to-purple-500 text-white font-bold py-2 px-4 rounded-xl shadow-lg transform transition-transform duration-300 hover:scale-105" onClick={() => handleAddModifyProspect(formData)}>
              {editCard !== 0 ? 'Modifier' : 'Ajouter'}
            </button>
          </div>
          
        </div>
      </ModalDialog>
    </div>
  )
}

export default App
