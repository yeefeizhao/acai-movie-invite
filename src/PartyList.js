import React, { useState, useEffect } from "react";
import firebase from "firebase/compat/app";
import { db } from "./firebase";
import "./PartyList.css";

const PartyList = ({ user }) => {
    const [items, setItems] = useState([]);
    const [newItem, setNewItem] = useState("");

    useEffect(() => {
        const unsubscribe = db.collection("party").onSnapshot((snapshot) => {
            const fetchedItems = snapshot.docs.map((doc) => ({
                id: doc.id,
                ...doc.data(),
            }));
            setItems(fetchedItems);
        });

        return () => unsubscribe();
    }, []);

    const addItem = async () => {
        if (newItem.trim() === "") return;
        await db.collection("party").add({
            name: user.displayName,
            uid: user.uid, 
            item: newItem,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
        });
        setNewItem("");
    };

    const deleteItem = async (id) => {
        await db.collection("party").doc(id).delete();
    };

    return (
        <div className="party-list">
            <div className="party-list-content">
                <div className="party-list-list">
                    <h2 className="party-list-title">pls bring a topping/fruit &lt;3 ty </h2>
                    <ul>
                        {items.map((item) => (
                            <li key={item.id}>
                                {item.name}: {item.item}
                                {item.uid === user.uid && (
                                    <div
                                        className="delete-button"
                                        onClick={() => deleteItem(item.id)}
                                    >
                                        <p>delete</p>
                                    </div>
                                )}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="add-container">
                    <input
                        type="text"
                        value={newItem}
                        onChange={(e) => setNewItem(e.target.value)}
                        placeholder="add what you're bringing..."
                    />
                    <div onClick={addItem} className="add-button">
                        <p>add item</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartyList;
