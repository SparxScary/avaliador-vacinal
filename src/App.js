import React, { useState, useEffect } from 'react';

const vacinas = [
  { id: 'bcg', nome: 'BCG', idade: 0, protecao: 'formas graves de tuberculose' },
  { id: 'hepb', nome: 'Hepatite B', idade: 0, protecao: 'hepatite B' },
  { id: 'vip1', nome: 'VIP (1ª dose)', idade: 2, protecao: 'poliomielite' },
  { id: 'rota1', nome: 'Rotavírus (1ª dose)', idade: 2, protecao: 'diarreia por rotavírus' },
  { id: 'penta1', nome: 'Penta (1ª dose)', idade: 2, protecao: 'difteria, tétano, coqueluche, hepatite B e Haemophilus influenzae tipo b' },
  { id: 'pneumo1', nome: 'Pneumocócica 10-valente (1ª dose)', idade: 2, protecao: 'pneumonia, meningite e otite' },
  { id: 'meningo1', nome: 'Meningocócica C (1ª dose)', idade: 3, protecao: 'meningite e meningococcemia' },
  { id: 'vip2', nome: 'VIP (2ª dose)', idade: 4, protecao: 'poliomielite' },
  { id: 'rota2', nome: 'Rotavírus (2ª dose)', idade: 4, protecao: 'diarreia por rotavírus' },
  { id: 'penta2', nome: 'Penta (2ª dose)', idade: 4, protecao: 'difteria, tétano, coqueluche, hepatite B e Haemophilus influenzae tipo b' },
  { id: 'pneumo2', nome: 'Pneumocócica 10-valente (2ª dose)', idade: 4, protecao: 'pneumonia, meningite e otite' },
  { id: 'meningo2', nome: 'Meningocócica C (2ª dose)', idade: 5, protecao: 'meningite e meningococcemia' },
  { id: 'vip3', nome: 'VIP (3ª dose)', idade: 6, protecao: 'poliomielite' },
  { id: 'penta3', nome: 'Penta (3ª dose)', idade: 6, protecao: 'difteria, tétano, coqueluche, hepatite B e Haemophilus influenzae tipo b' },
  { id: 'covid1', nome: 'COVID-19 (1ª dose)', idade: 6, protecao: 'COVID-19' },
  { id: 'covid2', nome: 'COVID-19 (2ª dose)', idade: 7, protecao: 'COVID-19' },
  { id: 'febre', nome: 'Febre Amarela', idade: 9, protecao: 'febre amarela' },
  { id: 'triplice', nome: 'Tríplice Viral (1ª dose)', idade: 12, protecao: 'sarampo, caxumba e rubéola' },
  { id: 'pneumo3', nome: 'Pneumocócica 10-valente (reforço)', idade: 12, protecao: 'pneumonia, meningite e otite' },
  { id: 'meningo3', nome: 'Meningocócica C (reforço)', idade: 12, protecao: 'meningite e meningococcemia' },
  { id: 'vop1', nome: 'VOP (1º reforço)', idade: 15, protecao: 'poliomielite' },
  { id: 'dtp1', nome: 'DTP (1º reforço)', idade: 15, protecao: 'difteria, tétano e coqueluche' },
  { id: 'hepa', nome: 'Hepatite A', idade: 15, protecao: 'hepatite A' },
  { id: 'tetra', nome: 'Tetraviral', idade: 15, protecao: 'sarampo, caxumba, rubéola e varicela' },
  { id: 'vop2', nome: 'VOP (2º reforço)', idade: 48, protecao: 'poliomielite' },
  { id: 'dtp2', nome: 'DTP (2º reforço)', idade: 48, protecao: 'difteria, tétano e coqueluche' },
  { id: 'varicela', nome: 'Varicela (2ª dose)', idade: 48, protecao: 'varicela' },
  { id: 'febre2', nome: 'Febre Amarela (reforço)', idade: 48, protecao: 'febre amarela' },
  { id: 'hpv', nome: 'HPV', idade: 108, protecao: 'infecção por HPV e câncer de colo do útero' },
];

function App() {
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
    setVacinasTomadas(prev =>
      prev.includes(id) ? prev.filter(v => v !== id) : [...prev, id]
    );
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

  const agruparVacinasPorMes = () => {
    const grupos = {};
    vacinas.forEach(vacina => {
      const chave = vacina.idade;
      if (!grupos[chave]) grupos[chave] = [];
      grupos[chave].push(vacina);
    });
    return Object.entries(grupos).sort((a, b) => a[0] - b[0]);
  };

  return (
    <div className="min-h-screen bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
      <div className="relative py-3 sm:max-w-xl sm:mx-auto">
        <div className="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <h1 className="text-2xl font-bold mb-6 text-center">Avaliador de Calendário Vacinal</h1>
          
          <div className="mb-6">
            <label className="block mb-2 text-sm font-medium text-gray-700">Idade da criança:</label>
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

          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Vacinas por idade:</h2>
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="py-2 px-4 border-b text-left">Idade</th>
                    <th className="py-2 px-4 border-b text-left">Vacinas</th>
                  </tr>
                </thead>
                <tbody>
                  {agruparVacinasPorMes().map(([idade, vacinasGrupo]) => (
                    <tr key={idade}>
                      <td className="py-2 px-4 border-b">
                        <span className="font-bold text-blue-600">{formatarIdade(parseInt(idade))}</span>
                      </td>
                      <td className="py-2 px-4 border-b">
                        {vacinasGrupo.map(vacina => (
                          <div key={vacina.id} className="flex items-center mb-1">
                            <input
                              type="checkbox"
                              id={vacina.id}
                              checked={vacinasTomadas.includes(vacina.id)}
                              onChange={() => handleVacinaTomada(vacina.id)}
                              className="mr-2"
                            />
                            <label htmlFor={vacina.id} className="text-sm">
                              <span className="font-bold text-black">{vacina.nome}</span>
                              {' - '}
                              <span className="italic">{vacina.protecao}</span>
                            </label>
                          </div>
                        ))}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="flex space-x-2 mb-6">
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
              Limpar
            </button>
          </div>

          {mostrarResultado && (
            <div className="mt-6">
              {vacinasFaltantes.length > 0 && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
                  <strong className="font-bold">Vacinas Faltantes:</strong>
                  <ul className="list-disc pl-5 mt-2">
                    {vacinasFaltantes.map((vacina, index) => (
                      <li key={index}>{vacina}</li>
                    ))}
                  </ul>
                </div>
              )}
              {proximasVacinas.length > 0 && (
                <div className="bg-blue-100 border border-blue-400 text-blue-700 px-4 py-3 rounded relative" role="alert">
                  <strong className="font-bold">Próximas Vacinas: </strong>
                  <ul className="list-disc pl-5 mt-2">
                    {proximasVacinas.map((vacina, index) => (
                      <li key={index}>{vacina}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;