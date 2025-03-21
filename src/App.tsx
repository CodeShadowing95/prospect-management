import { useEffect, useState } from 'react'
import ProspectCard from './components/ProspectCard'
import { FinanceRequest } from './types'
import { avatarz, financesRequests } from './constants';
import ModalDialog from './components/ModalDialog';

function App() {
  const storedData = localStorage.getItem('financesRequests');
  const data: FinanceRequest[] = storedData ? JSON.parse(storedData) : financesRequests;

  const [financeReq, setFinanceReq] = useState<FinanceRequest[]>(data);
  const [financeReqTemp, setFinanceReqTemp] = useState<FinanceRequest[]>(data);
  const [toggleModal, setToggleModal] = useState<boolean>(false);

  const [deleteCard, setDeleteCard] = useState(0);
  const [editCard, setEditCard] = useState(0);
  
  const [formData, setFormData] = useState<FinanceRequest>({
    id: financeReq.length ? Math.max(...financeReq.map(f => f.id)) + 1 : 1,
    nom: '',
    statut: 'En attente',
    montant: 0,
    date: '',
    avatar: avatarz[Math.floor(Math.random() * avatarz.length)]
  });

  const handleModalAdd = () => {
    setToggleModal(true);
    setFormData({
      id: financeReq.length ? Math.max(...financeReq.map(f => f.id)) + 1 : 1,
      nom: '',
      statut: 'En attente',
      montant: 0,
      date: '',
      avatar: avatarz[Math.floor(Math.random() * avatarz.length)]
    });
  }

  // Pour l'ajout/modification d'une demande
  const handleAddModifyProspect = (data: FinanceRequest) => {
    let updatedFinanceReq;
    if (editCard !== 0) {
      updatedFinanceReq = financeReq.map(financeRequest => financeRequest.id === editCard ? data : financeRequest);
    } else {
      updatedFinanceReq = [...financeReq, data];
    }

    setFinanceReq(updatedFinanceReq);
    setFinanceReqTemp(updatedFinanceReq);
    localStorage.setItem('financesRequests', JSON.stringify(updatedFinanceReq));
    setToggleModal(false);
    setEditCard(0);
  }

  // Suppression d'une demande
  const handleDelete = (id: number) => {
    const updatedFinanceReq = financeReq.filter(financeRequest => financeRequest.id !== id);
    localStorage.setItem('financesRequests', JSON.stringify(updatedFinanceReq));
    setFinanceReq(updatedFinanceReq);
    setFinanceReqTemp(updatedFinanceReq);
  }

  // On récupère les infos du lead qu'on veut modifier
  const handleEdit = (id: number) => {
    setEditCard(id);
    setFormData(financeReq.find(financeRequest => financeRequest.id === id) || { id: 0, nom: '', statut: '', montant: 0, date: '', avatar: '' });
    setToggleModal(true);
  }

  // On recherche une demande
  const handleSearch = (e: any) => {
    const searchTerm = e.target.value;

    if (searchTerm.trim() !== '') {
      setFinanceReq(financeReqTemp.filter(financeRequest => financeRequest.nom.toLowerCase().includes(searchTerm.toLowerCase())));
    } else {
      setFinanceReq(financeReqTemp);
    }
  }

  const handleFilter = (e: any) => {
    const status = e.target.value;

    if (status.trim() !== '') {
      setFinanceReq(financeReqTemp.filter(financeRequest => financeRequest.statut.toLowerCase() === status.toLowerCase()));
    } else {
      setFinanceReq(financeReqTemp);
    }
  }

  
  useEffect(() => {
    localStorage.setItem('financesRequests', JSON.stringify(financeReq));
  }, []);

  useEffect(() => {
    if (deleteCard) {
      handleDelete(deleteCard);
      setDeleteCard(0);
    }
  }, [deleteCard]);

  useEffect(() => {
    if (editCard !== 0) {
      handleEdit(editCard);
    }
  }, [editCard]);

  useEffect(() => {
    if(!toggleModal) {
      setEditCard(0);
    }
  }, [toggleModal]);
  

  return (
    <div className="max-w-[100dvw] min-h-[100dvh] bg-gray-50 flex flex-col items-center relative" style={{ backgroundImage: 'url(/banner.png)', backgroundSize: 'cover', backgroundPosition: 'center' }}>
      {/* Titre */}
      <div className='w-full flex items-center flex-col pt-10'>
        <h1 className="text-5xl font-bold tracking-wide text-gray-800 text-center">Leads Management</h1>
        <p className="text-lg text-gray-600 mt-4 text-center">
          La gestion de vos prospects n'a jamais été aussi facile et rapide
        </p>
      </div>
      
      <div className="w-full flex justify-between items-center gap-4 mt-14 px-10">
        {/* Filtres par statut */}
        <div className="relative w-1/3">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 text-gray-500" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="21" x2="14" y1="4" y2="4"/><line x1="10" x2="3" y1="4" y2="4"/><line x1="21" x2="12" y1="12" y2="12"/><line x1="8" x2="3" y1="12" y2="12"/><line x1="21" x2="16" y1="20" y2="20"/><line x1="12" x2="3" y1="20" y2="20"/><line x1="14" x2="14" y1="2" y2="6"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="16" x2="16" y1="18" y2="22"/></svg>
          </div>
          <select className="block w-full pl-10 pr-3 py-2 bg-white border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500" onChange={(e) => handleFilter(e)}>
            <option value="" selected>Tous les statuts</option>
            <option value="En attente">En attente</option>
            <option value="Confirmé">Confirmé</option>
            <option value="Refusé">Refusé</option>
          </select>
        </div>


        {/* Ajouter et rechercher */}
        <div className="w-full flex justify-end items-center gap-2">
          <div className="relative w-1/2 md:w-1/3">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <svg className="w-5 h-5 text-gray-500" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd"></path></svg>
            </div>
            <input type="text" className="bg-gray-50 border border-gray-300 text-gray-900 text-xs rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5" placeholder="Rechercher un prospect" onChange={(e) => handleSearch(e)} />
          </div>
          <button type="button" className="flex justify-center items-center gap-2 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-xs px-5 py-2.5 me-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800" onClick={handleModalAdd}>
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0 align-middle" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12h14"/><path d="M12 5v14"/></svg>
            Ajouter
          </button>
        </div>
      </div>
      
      {/* Affichage des prospects */}
      <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 px-10 mt-4 rounded-lg gap-4">
        {financeReq.length > 0 ? financeReq.map((item) => (
          <ProspectCard financeRequest={item} handleDelete={setDeleteCard} handleEdit={setEditCard} />
        )) : (
          <div className="col-span-4 flex flex-col items-center justify-center py-20">
            <svg xmlns="http://www.w3.org/2000/svg" className="w-16 h-16 text-gray-400 mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m6 8H6a2 2 0 01-2-2V6a2 2 0 012-2h12a2 2 0 012 2v12a2 2 0 01-2 2z" />
            </svg>
            <p className="text-xl text-gray-600 font-semibold text-center">Aucun prospect trouvé</p>
            <p className="text-sm text-gray-500 text-center mt-2">Essayez d'ajuster vos filtres ou d'effectuer une nouvelle recherche.</p>
          </div>
        )}
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
              name="nom"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              value={formData.nom}
              placeholder="Nom"
              required
              onChange={(e) => editCard !== 0 ? setFormData({ ...formData, nom: e.target.value }) : setFormData({ ...formData, nom: e.target.value })}
            />
            <select
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              name="statut"
              onChange={(e) => setFormData({ ...formData, statut: e.target.value })}
              value={formData.statut}
            >
              <option value="Confirmé" selected>Confirmé</option>
              <option value="En attente">En attente</option>
              <option value="Refusé">Refusé</option>
            </select>
            <input
              type="date"
              name="date"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              placeholder="Date"
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              value={formData.date}
            />
            <input
              type="number"
              min={1}
              name="montant"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-3"
              placeholder="Montant"
              onChange={(e) => setFormData({ ...formData, montant: Number(e.target.value) })}
              value={formData.montant}
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
