import React, { useState, useEffect } from 'react';

const Calendar = () => {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [selectedDate, setSelectedDate] = useState(null);


    return (
        <div>
            <h1 style={{ textAlign: 'center' }}>Calendar</h1>
            <div className="calendar-container">
                <div className="calendar-header" style={{ display: 'flex', alignItems: 'left' }}>
                    <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() - 1)))}>
                            &lt;
                    </button>
                    <div>
                        {currentDate.toLocaleString('default', { month: 'long' })} {currentDate.getFullYear()}
                    </div>
                    <button onClick={() => setCurrentDate(new Date(currentDate.setMonth(currentDate.getMonth() + 1)))}>
                        &gt;
                    </button>
                </div>
                <div className="calendar-body" style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', gap: '2px', width: '200px',}}>
                    {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                        <div key={day} style={{ textAlign: 'center', padding: '5px' }}>
                            {day}
                        </div>
                    ))}
                    {Array(new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay()).fill(null).map((_, i) => (
                        <div key={`empty-${i}`} style={{ padding: '2px' }}></div>
                    ))}
                    {Array(new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate()).fill(null).map((_, i) => {
                        const month_correct = !selectedDate && new Date().getDate() === i + 1 && new Date().getMonth() === currentDate.getMonth();

                        return (
                            <div 
                                key={i + 1} 
                                style={{ 
                                    textAlign: 'center', 
                                    padding: '2px',
                                    backgroundColor: month_correct || selectedDate === i + 1 ? '#e6e6e6' : 'transparent',
                                    cursor: 'pointer'
                                }}
                                onClick={() => setSelectedDate(i + 1)}
                            >
                                {i + 1}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    )
}

export default Calendar;

