import React, { useState, useEffect } from 'react';
import { AlertCircle, Trash2 } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

const vacinas = [
  { id: 'bcg', nome: 'BCG', idade: 0 },
  { id: 'hepb', nome: 'Hepatite B', idade: 0 },
  { id: 'vip1', nome: 'VIP (1ª dose)', idade: 2 },
  { id: 'rota1', nome: 'Rotavírus (1ª dose)', idade: 2 },
  { id: 'penta1', nome: 'Penta (1ª dose)', idade: 2 },
  { id: 'pneumo1', nome: 'Pneumocócica 10-valente (1ª dose)', idade: 2 },
  { id: 'meningo1', nome: 'Meningocócica C (1ª dose)', idade: 3 },
  { id: 'vip2', nome: 'VIP (2ª dose)', idade: 4 },
  { id: 'rota2', nome: 'Rotavírus (2ª dose)', idade: 4 },
  { id: 'penta2', nome: 'Penta (2ª dose)', idade: 4 },
  { id: 'pneumo2', nome: 'Pneumocócica 10-valente (2ª dose)', idade: 4 },
  { id: 'meningo2', nome: 'Meningocócica C (2ª dose)', idade: 5 },
  { id: 'vip3', nome: 'VIP (3ª dose)', idade: 6 },
  { id: 'penta3', nome: 'Penta (3ª dose)', idade: 6 },
  { id: 'covid1', nome: 'COVID-19 (1ª dose)', idade: 6 },
  { id: 'covid2', nome: 'COVID-19 (2ª dose)', idade: 7 },
  { id: 'febre', nome: 'Febre Amarela', idade: 9 },
  { id: 'triplice', nome: 'Tríplice Viral (1ª dose)', idade: 12 },
  { id: 'pneumo3', nome: 'Pneumocócica 10-valente (reforço)', idade: 12 },
  { id: 'meningo3', nome: 'Meningocócica C (reforço)', idade: 12 },
  { id: 'vop1', nome: 'VOP (1º reforço)', idade: 15 },
  { id: 'dtp1', nome: 'DTP (1º reforço)', idade: 15 },
  { id: 'hepa', nome: 'Hepatite A', idade: 15 },
  { id: 'tetra', nome: 'Tetraviral', idade: 15 },
  { id: 'vop2', nome: 'VOP (2º reforço)', idade: 48 },
  { id: 'dtp2', nome: 'DTP (2º reforço)', idade: 48 },
  { id: 'varicela', nome: 'Varicela (2ª dose)', idade: 48 },
  { id: 'febre2', nome: 'Febre Amarela (reforço)', idade: 48 },
  { id: 'hpv', nome: 'HPV', idade: 108 },
];

const AvaliadorCalendarioVacinal = () => {
  const [idadeMeses, setIdadeMeses] = useState('');
  const [idadeAnos, setIdadeAnos] = useState('');
  const [vacinasTomadas, setVacinasTomadas] = useState([]);
  const [vacinasFaltantes, setVacinasFaltantes] = useState([]); 
  const [proximasVacinas, setProximasVacinas] = useState([]);
  const [mostrarResultado, setMostrarResultado] = useState(false);

  useEffect(() => {
    if (idadeAnos !== '') {
      setIdadeMeses(Math.floor(parseFloat(idadeAnos) * 12).toString());
    }
  }, [idadeAnos]);

  const handleIdadeMesesChange = (e) => {
    setIdadeMeses(e.target.value);
    setIdadeAnos('');
    setMostrarResultado(false);
  };

  const handleIdadeAnosChange = (e) => {
    setIdadeAnos(e.target.value);
    setMostrarResultado(false);
  };

  const handleVacinaTomada = (id) => {
    if (vacinasTomadas.includes(id)) {
      setVacinasTomadas(vacinasTomadas.filter(v => v !== id));
    } else {
      setVacinasTomadas([...vacinasTomadas, id]);
    }
  };

  const avaliarVacinas = () => {
    const idadeMesesNum = parseInt(idadeMeses);
    const faltantes = vacinas
      .filter(v => v.idade <= idadeMesesNum && !vacinasTomadas.includes(v.id))
      .map(v => v.nome);
    const proximas = vacinas
      .filter(v => v.idade > idadeMesesNum)
      .slice(0, 3)
      .map(v => `${v.nome} (${formatarIdade(v.idade)})`);
    
    setVacinasFaltantes(faltantes);
    setProximasVacinas(proximas);
    setMostrarResultado(true);
  };

  const limparFormulario = () => {
    setIdadeMeses('');
    setIdadeAnos('');
    setVacinasTomadas([]);
    setVacinasFaltantes([]);
    setProximasVacinas([]);
    setMostrarResultado(false);
  };

  const formatarIdade = (idade) => {
    if (idade === 0) return "Ao nascer";
    if (idade < 12) return `${idade} meses`;
    if (idade === 12) return "1 ano";
    if (idade % 12 === 0) return `${idade / 12} anos`;
    return `${Math.floor(idade / 12)} anos e ${idade % 12} meses`;
  };

  return (
    <div className="p-4 max-w-md mx-auto">
      <h1 className="text-2xl font-bold mb-4">Avaliador de Calendário Vacinal</h1>
      <div className="mb-4">
        <label className="block mb-2">Idade da criança:</label>
        <div className="flex space-x-2">
          <input 
            type="number" 
            value={idadeMeses} 
            onChange={handleIdadeMesesChange}
            placeholder="Meses"
            className="w-1/2 p-2 border rounded"
          />
          <input 
            type="number" 
            value={idadeAnos} 
            onChange={handleIdadeAnosChange}
            placeholder="Anos (opcional)"
            className="w-1/2 p-2 border rounded"
          />
        </div>
      </div>
      <div className="mb-4">
        <h2 className="text-xl font-semibold mb-2">Vacinas tomadas:</h2>
        {vacinas.map(vacina => (
          <div key={vacina.id} className="flex items-center mb-2">
            <input
              type="checkbox"
              id={vacina.id}
              checked={vacinasTomadas.includes(vacina.id)}
              onChange={() => handleVacinaTomada(vacina.id)}
              className="mr-2"
            />
            <label htmlFor={vacina.id}>
              {vacina.nome} - {formatarIdade(vacina.idade)}
            </label>
          </div>
        ))}
      </div>
      <div className="flex space-x-2 mb-4">
        <button 
          onClick={avaliarVacinas}
          className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600 flex-grow"
        >
          Avaliar Calendário Vacinal
        </button>
        <button 
          onClick={limparFormulario}
          className="bg-red-500 text-white p-2 rounded hover:bg-red-600 flex-shrink-0"
        >
          <Trash2 className="h-5 w-5" />
        </button>
      </div>
      {mostrarResultado && (
        <div className="mt-4">
          {vacinasFaltantes.length > 0 && (
            <Alert variant="destructive">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Vacinas Faltantes</AlertTitle>
              <AlertDescription>
                <ul className="list-disc pl-5">
                  {vacinasFaltantes.map((vacina, index) => (
                    <li key={index}>{vacina}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
          {proximasVacinas.length > 0 && (
            <Alert className="mt-4">
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Próximas Vacinas</AlertTitle>
              <AlertDescription>
                <ul className="list-disc pl-5">
                  {proximasVacinas.map((vacina, index) => (
                    <li key={index}>{vacina}</li>
                  ))}
                </ul>
              </AlertDescription>
            </Alert>
          )}
        </div>
      )}
    </div>
  );
};

export default AvaliadorCalendarioVacinal;