import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import html2canvas from 'html2canvas';
import midiaImg from './img/midia.png';
import projectionImg from './img/projection.png';

function App() {
  const duo = [
    { projection: 'Murilo', social: 'Kaylla' },
    { projection: 'Kalebe', social: 'Iasmym' },
    { projection: 'Sara', social: 'Ariellen' },
  ];

  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [schedule, setSchedule] = useState([]);
  const [selectedDuo, setSelectedDuo] = useState('');
  const scheduleRef = useRef(null); // Referência para capturar o conteúdo da escala

  useEffect(() => {
    setMonth(new Date().getMonth() + 1);
    setYear(new Date().getFullYear());
  }, []);

  // Função para verificar os domingos de um mês específico
  const getSundays = (month, year) => {
    const sundays = [];
    const date = new Date(year, month - 1, 1);

    while (date.getMonth() === month - 1) {
      if (date.getDay() === 0) { // Verifica se é domingo
        sundays.push(new Date(date)); // Adiciona o domingo à lista
      }
      date.setDate(date.getDate() + 1);
    }
    return sundays;
  };

  // Gera a escala de duplas para cada domingo do mês
  const generateSchedule = () => {
    if (!month || !year) return;

    const sundays = getSundays(parseInt(month), parseInt(year));
    const newSchedule = sundays.map((sunday, index) => ({
      date: sunday.toLocaleDateString(),
      projection: duo[(index + selectedDuo) % duo.length].projection,
      social: duo[(index + selectedDuo) % duo.length].social
    }));
    setSchedule(newSchedule);
  };

  // Função para gerar a imagem
  const generateImage = async () => {
    if (scheduleRef.current) {
      const canvas = await html2canvas(scheduleRef.current);
      const link = document.createElement('a');
      link.href = canvas.toDataURL('image/png');
      link.download = `schedule_${month}_${year}.png`;
      link.click();
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Escala de Projeção</h1>

      <div style={styles.inputGroup}>
        <label style={styles.label}>
          Selecione a dupla inicial:
          <select value={selectedDuo} onChange={(e) => setSelectedDuo(parseInt(e.target.value))} style={styles.select}>
            <option value="">Escolha uma dupla</option>
            {duo.map((pair, index) => (
              <option key={index} value={index}>{`${pair.projection} e ${pair.social}`}</option>
            ))}
          </select>
        </label>
      </div>

      <div style={styles.inputGroup}>
        <label style={styles.label}>
          Mês (1-12): <input type="number" value={month} onChange={(e) => setMonth(e.target.value)} style={styles.input} />
        </label>
      </div>
      <div style={styles.inputGroup}>
        <label style={styles.label}>
          Ano: <input type="number" value={year} onChange={(e) => setYear(e.target.value)} style={styles.input} />
        </label>
      </div>
      <button style={styles.button} onClick={generateSchedule}>Gerar Escala</button>

      <div ref={scheduleRef}
        style={{
          padding: '4px'
        }}>
        <h2 style={styles.subheader}>Calendário de Mídia - ICEC</h2>
        <div style={{
          display: 'flex',
          marginBottom: '4px',
          padding: '4px',
          paddingLeft: '120px',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <img
            src={projectionImg}
            alt="projection"
            style={{ width: '40px', height: '40px', marginRight: '80px' }}
          />
          <img
            src={midiaImg}
            alt="midia"
            style={{ width: '40px', height: '40px' }}
          />
        </div>
        {
          schedule.map((item, index) => (
            <div style={{
              display: 'flex',
              flexDirection: 'row',
              marginBottom: '4px',
              justifyContent: 'center'
            }}>
              <div style={styles.boxContainer}>
                {item.date}
              </div>
              <div style={styles.boxContainer}>
                {item.projection}
              </div>
              <div style={styles.boxContainer}>
                {item.social}
              </div>
            </div>
          ))
        }
      </div>

      <button onClick={generateImage} style={styles.button}>Baixar Imagem da Escala</button>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: '500px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif',
    backgroundColor: '#f9f9f9',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
  },
  header: {
    fontSize: '24px',
    textAlign: 'center',
    color: '#333',
    marginBottom: '20px',
  },
  inputGroup: {
    marginBottom: '15px',
  },
  label: {
    display: 'block',
    fontSize: '16px',
    color: '#333',
    marginBottom: '5px',
  },
  input: {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  select: {
    width: '100%',
    padding: '8px',
    fontSize: '16px',
    borderRadius: '5px',
    border: '1px solid #ddd',
  },
  button: {
    width: '100%',
    padding: '10px',
    fontSize: '16px',
    color: '#fff',
    backgroundColor: '#4CAF50',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  buttonHover: {
    backgroundColor: '#45A049',
  },
  subheader: {
    fontSize: '20px',
    color: '#333',
    marginTop: '20px',
    textAlign: 'center'
  },
  boxContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '10px',
    border: '2px solid #054D51',
    borderRadius: '4px',
    width: '100px',
    marginRight: 2
  }
};

export default App;
