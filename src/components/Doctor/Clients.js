import React from "react";
import "../../assets/doctors_clients.scss";

function Clients({ handleClient, clients, handleSort }) {
  return (
    <div className="mainClientsDiv">
      <div className="clientsDiv">
        <h4>Clients</h4>
        <label>
          Sort by:{" "}
          <select onClick={handleSort}>
            <option value="">Sort it...</option>
            <option value="nameAZ">Name: A-Z</option>
            <option value="nameZA">Name: Z-A</option>
          </select>
        </label>
      </div>
      <div className="row2">
        {clients.map(client => {
          return client.id === null ? null : (
            <div key={client.id} className="list-group">
              <button
                data-id={client.id}
                className="list-group-item"
                onClick={() => handleClient(client.id)}
              >
                {client.client}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Clients;
