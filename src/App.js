import React, { useState } from 'react';
import './App.css'
import { Infos } from './components/Infos/Infos';
import { DevisForm } from './components/DevisForm/DevisForm';
import { FactureForm } from './components/FactureForm/FactureForm';

const App = () => {
  const [showForm, setShowForm] = useState(false)
  const [showFact, setShowFact] = useState(false)

  const handleShowDevisForm = () => {
    setShowForm(showForm => !showForm)
    if (showFact) {
      setShowFact(showFact => !showFact)
    }
  }
  const handleShowFactForm = () => {
    setShowFact(showFact => !showFact)
    if (showForm) {
      setShowForm(showForm => !showForm)
    }
  }

  return (
    <>
      <Infos showForm={showForm} showFact={showFact} handleShowDevisForm={handleShowDevisForm} handleShowFactForm={handleShowFactForm} />
      {showForm && <DevisForm />}
      {showFact && <FactureForm />}
    </>
  );
}

export default App;
