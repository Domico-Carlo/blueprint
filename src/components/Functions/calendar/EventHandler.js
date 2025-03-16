import React, { useState } from 'react';
import Modal from 'react-modal';

// Important: Set the app element for accessibility
Modal.setAppElement('#root');  // or whatever your root element id is

const EventHandler = ({ onEventCreate }) => {
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [eventData, setEventData] = useState(new Map([
        ['name', ''],
        ['description', ''],
        ['location', ''],
        ['date', '']
    ]));

    const modalSubmit = () => {
        console.log(eventData);
    };

    const EventModal = () => {
        return (
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
                shouldCloseOnOverlayClick={false}
                style={{
                    content: {
                        top: '50%',
                        left: '50%',
                        right: 'auto',
                        bottom: 'auto',
                        marginRight: '-50%',
                        transform: 'translate(-50%, -50%)',
                        width: '400px'
                    },
                    overlay: {
                        backgroundColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }}
            >
                <h2>Create New Event</h2>
                {/* Your form content here */
                <form>
                    Event Name:<br/>
                    <input type="text" placeholder="Event Name" /><br/><br/>
                    Event Description:<br/>
                    <textarea 
                        placeholder="Event Description"
                        style={{
                            width: '96%',
                            height: '100px',
                            padding: '8px',
                            resize: 'vertical'
                        }}
                    /><br/><br/>
                    Event Location:<br/>
                    <input type="text" placeholder="Event Location" /><br/><br/>
                    Event Date:<br/>
                    <input type="datetime-local" placeholder="Event Date" /><br/><br/>
                    <button type="submit">Create</button> <button onClick={() => setModalIsOpen(false)}>Close</button>
                </form>
                }
            </Modal>
        );
    };

    return (
        <div className="event-handler" style={{ alignItems: 'center', justifyContent: 'center', display: 'flex'}}>
            <button onClick={() => setModalIsOpen(true)} style={{ width: '200px', height: '50px', fontSize: '20px'}}>Create Event</button>
            
            <EventModal/>
        </div>
    );
};

export default EventHandler;