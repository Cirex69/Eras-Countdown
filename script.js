import conciertos from './collectionConciertos.js'
document.addEventListener('DOMContentLoaded', function () {
    // Obtén el elemento select


    
   
    const selectFecha = document.getElementById('selectFecha');
    const countdown = document.querySelector('.countdown-timer');
    let interval; // Declarar interval aquí para que pueda ser accedido en diferentes partes del código

  

    // Función para actualizar el contador
    function updateCountdown(selectedConcierto) {
        // Detener cualquier intervalo anterior (si lo hay)
        clearInterval(interval);
    
        // Encuentra y elimina cualquier mensaje del concierto pasado anterior
        const concertPassedMessage = countdown.querySelector('h1');
        if (concertPassedMessage) {
            concertPassedMessage.remove();
        }
    
        // Divide la cadena de fecha en día, mes y año
        const fechaParts = selectedConcierto.Fecha.split(' de ');
        const dia = parseInt(fechaParts[0]);
        const mes = fechaParts[1];
        const año = parseInt(fechaParts[2]);
    
        // Crea una fecha válida a partir de los componentes
        const concertDate = new Date(año, getMonthNumber(mes), dia).getTime();
    
        // Verifica si la fecha ya pasó
         const now = new Date()
        const nowWithoutTime = new Date(now.getFullYear(), now.getMonth(), now.getDate()); // Obtenemos la fecha actual sin la hora y minutos

        if (nowWithoutTime > concertDate) {
            // Agrega el mensaje de concierto pasado
            const concertPassedMessage = document.createElement('h1');
            concertPassedMessage.textContent = "¡Este concierto ya pasó!";
            countdown.appendChild(concertPassedMessage);
        
            // Actualiza los contadores a cero
            document.getElementById('days').textContent = '00';
            document.getElementById('hours').textContent = '00';
            document.getElementById('minutes').textContent = '00';
            document.getElementById('seconds').textContent = '00';

            // Limpia la información adicional (país, recinto, ciudad, telonero)
            document.getElementById('pais').textContent = '--';
            document.getElementById('recinto').textContent = '--';
            document.getElementById('city').textContent = '--';
            document.getElementById('telonero').textContent = '--'

        } else if (nowWithoutTime.getTime() === concertDate) {
            const concertTodayMessage = document.createElement('h1');
            concertTodayMessage.textContent = "¡Este concierto es hoy!";
            countdown.appendChild(concertTodayMessage);
        
            // Reproducir un sonido si el concierto es hoy
            const audio = new Audio('./audio/ARF.mp3');
            audio.play();
        } else {
            // Actualiza el contador cada segundo
            interval = setInterval(function () {
                const now = new Date().getTime();
                const timeLeft = concertDate - now;
    
                if (timeLeft <= 0) {
                    clearInterval(interval);
                    // Agrega el mensaje de concierto pasado
                    const concertPassedMessage = document.createElement('h1');
                    concertPassedMessage.textContent = "¡Este concierto ya pasó!";
                    countdown.appendChild(concertPassedMessage);
    
                    // Actualiza los contadores a cero
                    document.getElementById('days').textContent = '00';
                    document.getElementById('hours').textContent = '00';
                    document.getElementById('minutes').textContent = '00';
                    document.getElementById('seconds').textContent = '00';

                    document.getElementById('pais').textContent = '--';
                    document.getElementById('recinto').textContent = '--';
                    document.getElementById('city').textContent = '--';
                    document.getElementById('telonero').textContent = '--'

                    return;
                }
    
                const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
                const hours = Math.floor((timeLeft % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((timeLeft % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((timeLeft % (1000 * 60)) / 1000);
    
                document.getElementById('days').textContent = days.toString().padStart(2, '0');
                document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
                document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
                document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
            }, 1000);
        }
        // Actualiza la información adicional (país, recinto, ciudad, telonero)
    document.getElementById('pais').textContent = selectedConcierto.País;
    document.getElementById('recinto').textContent = selectedConcierto.Recinto;
    document.getElementById('city').textContent = selectedConcierto.Ciudad;
    document.getElementById('telonero').textContent = selectedConcierto.Telonero;
    }
    
    
    
    

    // Escucha eventos de cambio en el selector
    selectFecha.addEventListener('change', () => {
        const selectedIndex = selectFecha.value;
        if (selectedIndex >= 0) {
            const selectedConcierto = conciertos[selectedIndex];
            updateCountdown(selectedConcierto);
        }
    });

    // Recorre la lista de conciertos y agrega las fechas al selector
    conciertos.forEach((concierto, index) => {
        const option = document.createElement('option');
        option.value = index; // Puedes usar el índice como valor
        option.textContent = concierto.Fecha;
        selectFecha.appendChild(option);
    });

    // Esta función convierte el nombre del mes en su número correspondiente
    function getMonthNumber(month) {
        const months = {
            enero: 0,
            febrero: 1,
            marzo: 2,
            abril: 3,
            mayo: 4,
            junio: 5,
            julio: 6,
            agosto: 7,
            septiembre: 8,
            octubre: 9,
            noviembre: 10,
            diciembre: 11
        };
        return months[month.toLowerCase()];
    }
});
