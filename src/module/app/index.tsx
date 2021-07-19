import axios from "axios";
import React, { useState } from "react";
import Loading from "../../common/loading";
import { AppProps, Ontology } from "./interface";

const App: React.FC<AppProps> = () => {
  const emptyOntology = {
    ontologyId: "",
    title: "",
    description: "",
    definitionProperties: [],
    synonymProperties: [],
  };

  const [inputId, setInputId] = useState("");
  const [ontology, setOntology] = useState<Ontology>(emptyOntology);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState("");

  return (
    <div className="App">
      {isLoading ? <Loading /> : null}
      <div className="container is-max-widescreen">
        <div className="section">
          <div className="columns is-multiline">
            <div className="column is-12">
              <div className="title">Ontologies Tools</div>
              <div className="subtitle">Lookup Service</div>
            </div>
            <div className="column is-10">
              <label className="label">Ontology ID</label>
              <div className="control">
                <input
                  className="input"
                  type="text"
                  placeholder="Enter ID here"
                  onChange={(e) => {
                    setInputId(e.target.value);
                  }}
                />
              </div>
            </div>
            <div className="column is-2 is-align-self-flex-end">
              <button
                className="button is-primary is-fullwidth"
                onClick={() => {
                  setIsLoading(true);
                  setTimeout(() => {
                    axios
                      .get<Ontology>(
                        `http://localhost:8080/v1/ontology/search/${inputId}`,
                        {
                          headers: {
                            "Content-Type": "application/json",
                          },
                        }
                      )
                      .then((response) => {
                        setOntology(response.data);
                        setIsLoading(false);
                        setError("");
                      })
                      .catch((err) => {
                        const error =
                          err.response?.status === 404
                            ? "Resource not found"
                            : "An unexpected error has occurred";
                        setError(error);
                        setIsLoading(false);
                        setOntology(emptyOntology);
                      });
                  }, 1000);
                }}
              >
                Submit
              </button>
            </div>
          </div>
        </div>
        <div className="section">
          <div className="columns is-multiline">
            <div className="column is-12">
              <div className="subtitle has-text-weight-bold">Result:</div>
            </div>
            <div className="column is-12">
              {error || !ontology.ontologyId ? (
                <div>No data</div>
              ) : (
                <table className="table is-fullwidth is-hoverable">
                  <tbody>
                    <tr>
                      <td>ID</td>
                      <td>{ontology.ontologyId}</td>
                    </tr>
                    <tr>
                      <td>TITLE</td>
                      <td>{ontology.title}</td>
                    </tr>
                    <tr>
                      <td>DECRIPTION</td>
                      <td>{ontology.description}</td>
                    </tr>
                    <tr>
                      <td>DEFINITIONS</td>
                      <td>{ontology.definitionProperties.join(", ")}</td>
                    </tr>
                    <tr>
                      <td>SYNONYMS</td>
                      <td>{ontology.synonymProperties.join(", ")}</td>
                    </tr>
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
