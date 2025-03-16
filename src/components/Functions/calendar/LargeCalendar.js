import React, { useState } from 'react';

const LargeCalendar = ({ selectedDate }) => {
    const [viewMode, setViewMode] = useState('month'); // 'day', 'week', or 'month'
    const [currentDate, setCurrentDate] = useState(new Date());

    const renderDayView = () => {
        const hours = Array.from({ length: 24 }, (_, i) => i);
        return (
            <div style={{ display: 'grid', gridTemplateColumns: '100px 1fr', width: '77vw' }}>
                <div>
                    {hours.map(hour => (
                        <div key={hour} style={{ height: '60px', borderBottom: '1px solid #eee', padding: '5px' }}>
                            {hour}:00
                        </div>
                    ))}
                </div>
                <div style={{ borderLeft: '1px solid #eee' }}>
                    {hours.map(hour => (
                        <div key={hour} style={{ height: '60px', borderBottom: '1px solid #eee', padding: '5px' }}></div>
                    ))}
                </div>
            </div>
        );
    };

    const renderWeekView = () => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const hours = Array.from({ length: 24 }, (_, i) => i);
        
        return (
            <div style={{ width: '77vw' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '100px repeat(7, 1fr)' }}>
                    <div></div> {}
                    {days.map(day => (
                        <div key={day} style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold', borderBottom: '1px solid #eee' }}>
                            {day}
                        </div>
                    ))}
                    
                    {hours.map(hour => (
                        <React.Fragment key={hour}>
                            <div style={{ padding: '5px', borderBottom: '1px solid #eee', height: '60px' }}>
                                {hour}:00
                            </div>
                            {days.map((day, index) => (
                                <div 
                                    key={`${day}-${hour}`} 
                                    style={{ 
                                        borderBottom: '1px solid #eee',
                                        borderLeft: '2px solid #eee',
                                        borderRight: '2px solid #eee',
                                        padding: '5px',
                                        height: '60px'
                                    }}
                                ></div>
                            ))}
                        </React.Fragment>
                    ))}
                </div>
            </div>
        );
    };

    const renderMonthView = () => {
        const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
        const firstDay = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1).getDay();
        const daysInMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0).getDate();
        
        return (
            <div style={{ width: '77vw' }}>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)', border: '0px' }}>
                    {days.map(day => (
                        <div key={day} style={{ padding: '10px', textAlign: 'center', fontWeight: 'bold' }}>
                            {day}
                        </div>
                    ))}
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(7, 1fr)' }}>
                    {Array(firstDay).fill(null).map((_, i) => (
                        <div key={`empty-${i}`} style={{ height: '80px', border: '0px', padding: '5px'}}></div>
                    ))}
                    {Array(daysInMonth).fill(null).map((_, i) => (
                        <div 
                            key={i + 1} 
                            style={{ 
                                height: '80px', 
                                border: '1px solid #eee',
                                padding: '5px',
                                backgroundColor: selectedDate === i + 1 ? '#e6f3ff' : 'transparent'
                            }}
                        >
                            {i + 1}
                        </div>
                    ))}
                </div>
            </div>
        );
    };

    return (
        <div>
            <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
                <button onClick={() => setViewMode('day')}>Day</button>
                <button onClick={() => setViewMode('week')}>Week</button>
                <button onClick={() => setViewMode('month')}>Month</button>
            </div>
            {viewMode === 'day' && renderDayView()}
            {viewMode === 'week' && renderWeekView()}
            {viewMode === 'month' && renderMonthView()}
        </div>
    );
};

export default LargeCalendar; 