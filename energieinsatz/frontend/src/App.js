import React, { useState, useEffect } from 'react';
import { 
  Card, 
  Button, 
  Typography, 
  Layout,
  notification 
} from 'antd';
import { EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Content } = Layout;

const EnergyPlanning = () => {
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState({});
  const [initialContent] = useState({
    // ... (contenu initial inchangé)
  });

  // Charger le contenu depuis localStorage au montage du composant
  useEffect(() => {
    const savedContent = localStorage.getItem('energyPlanningContent');
    if (savedContent) {
      setContent(JSON.parse(savedContent));
    } else {
      setContent(initialContent);
    }
  }, [initialContent]);

  // Sauvegarder le contenu dans localStorage à chaque modification
  useEffect(() => {
    if (Object.keys(content).length > 0) {
      localStorage.setItem('energyPlanningContent', JSON.stringify(content));
    }
  }, [content]);

  const toggleEditMode = () => {
    setEditMode(!editMode);
  };

  const handleContentChange = (cellId, newContent) => {
    setContent(prev => ({
      ...prev,
      [cellId]: newContent
    }));
  };

  const saveChanges = () => {
    setEditMode(false);
    notification.success({
      message: 'Änderungen erfolgreich gespeichert',
      description: 'Alle Modifikationen wurden im System gesichert.',
      duration: 2,
      placement: 'topRight'
    });
  };

  const cancelEdit = () => {
    setEditMode(false);
    const savedContent = localStorage.getItem('energyPlanningContent');
    if (savedContent) {
      setContent(JSON.parse(savedContent));
    } else {
      setContent(initialContent);
    }
    notification.info({
      message: 'Bearbeitungsmodus deaktiviert',
      description: 'Die vorgenommenen Änderungen wurden verworfen.',
      duration: 2,
      placement: 'topRight'
    });
  };

  const EditableCell = ({ cellId, children }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [tempContent, setTempContent] = useState(content[cellId] || '');

    useEffect(() => {
      setTempContent(content[cellId] || '');
    }, [content, cellId]);

    const handleSave = () => {
      handleContentChange(cellId, tempContent);
      setIsEditing(false);
      notification.success({
        message: 'Zellinhalt aktualisiert',
        description: 'Die Änderungen wurden erfolgreich übernommen.',
        duration: 1.5,
        placement: 'topRight'
      });
    };

    const handleCancel = () => {
      setTempContent(content[cellId] || '');
      setIsEditing(false);
    };

    return (
      <div style={{ position: 'relative' }}>
        {editMode && !isEditing && (
          <Button 
            icon={<EditOutlined />} 
            size="small" 
            type="primary"
            style={{ 
              position: 'absolute', 
              top: 5, 
              right: 5, 
              zIndex: 10,
              backgroundColor: '#1890ff',
              borderColor: '#1890ff',
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
            }}
            onClick={() => setIsEditing(true)}
          />
        )}
        
        {isEditing ? (
          <div>
            <div
              contentEditable
              dangerouslySetInnerHTML={{ __html: tempContent }}
              onInput={(e) => setTempContent(e.target.innerHTML)}
              style={{
                backgroundColor: '#ffffcc',
                outline: '2px solid #4a90e2',
                padding: 6,
                minHeight: 40
              }}
            />
            <div style={{ marginTop: 8 }}>
              <Button 
                icon={<SaveOutlined />} 
                size="small" 
                onClick={handleSave} 
                style={{ 
                  marginRight: 8,
                  backgroundColor: '#52c41a',
                  borderColor: '#52c41a',
                  color: 'white'
                }}
              >
                Speichern
              </Button>
              <Button 
                icon={<CloseOutlined />} 
                size="small" 
                onClick={handleCancel}
                style={{
                  backgroundColor: '#f5222d',
                  borderColor: '#f5222d',
                  color: 'white'
                }}
              >
                Abbrechen
              </Button>
            </div>
          </div>
        ) : (
          <div dangerouslySetInnerHTML={{ __html: children }} />
        )}
      </div>
    );
  };

  return (
    <Layout style={{ padding: 24, background: 'white', minHeight: '100vh' }}>
      <Content>
        <div style={{ maxWidth: 1800, margin: '0 auto', background: 'white' }}>
          {/* En-tête avec boutons */}
          <div style={{ display: 'flex', width: '100%', marginBottom: 16, position: 'relative' }}>
            <div style={{ position: 'absolute', left: 0, top: 0 }}>
              <Button 
                href="http://4.231.103.159:6081/?page_id=274" 
                style={{ padding: '6px 12px' }}
              >
                Zurück
              </Button>
            </div>
            
            <div style={{ flex: 1, textAlign: 'center', marginLeft: 100 }}>
              <Title level={2} style={{ margin: 0, fontSize: 18, fontWeight: 'bold', color: '#333' }}>
                Energieplanung
              </Title>
              <Text style={{ fontSize: 14, color: '#555', marginTop: 4, display: 'block' }}>
                Ergebnisse energetischer Planungsprocess
              </Text>
            </div>
            <div style={{ flex: 1, textAlign: 'center', marginLeft: 50 }}>
              <Title level={2} style={{ margin: 0, fontSize: 18, fontWeight: 'bold', color: '#333' }}>
                Energieeinsatz
              </Title>
              <Text style={{ fontSize: 14, color: '#555', marginTop: 4, display: 'block' }}>
                Energieeinsatz MRS
              </Text>
            </div>
          </div>

          {/* Boutons de contrôle d'édition */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16 }}>
            {editMode ? (
              <>
                <Button 
                  icon={<SaveOutlined />} 
                  onClick={saveChanges} 
                  style={{ 
                    marginRight: 8,
                    backgroundColor: '#52c41a',
                    borderColor: '#52c41a',
                    color: 'white'
                  }}
                >
                  Änderungen speichern
                </Button>
                <Button 
                  icon={<CloseOutlined />} 
                  onClick={cancelEdit}
                  style={{
                    backgroundColor: '#f5222d',
                    borderColor: '#f5222d',
                    color: 'white'
                  }}
                >
                  Abbrechen
                </Button>
              </>
            ) : (
              <Button 
                icon={<EditOutlined />} 
                onClick={toggleEditMode} 
                type="primary"
                style={{
                  backgroundColor: '#1890ff',
                  borderColor: '#1890ff',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
                }}
              >
                Bearbeitungsmodus aktivieren
              </Button>
            )}
          </div>

          {/* Contenu principal avec disposition flexbox */}
          <div style={{ 
            display: 'flex', 
            flexWrap: 'nowrap', 
            alignItems: 'flex-start', 
            background: 'white', 
            padding: '20px 0', 
            borderRadius: 8 
          }}>
            
            {/* Partie gauche - Energieplanung (3 colonnes) */}
            <div style={{ 
              display: 'flex', 
              flex: 3, 
              gap: 10, 
              minWidth: 660, 
              padding: '0 20px' 
            }}>
              
              {/* Colonne 1 */}
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ 
                  background: 'white', 
                  padding: '8px 12px', 
                  borderRadius: 5, 
                  fontWeight: 'bold', 
                  fontSize: 14,
                  marginBottom: 6,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                  Eingabeparameter für die Planung
                </div>
                <div style={{ 
                  background: 'white', 
                  padding: 10, 
                  borderRadius: 5,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  fontSize: 12
                }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 10 }}>
                    <tbody>
                      <tr style={{ backgroundColor: '#d3d3d3' }}>
                        <td style={{ padding: 6 }}>Energieeinsatz</td>
                      </tr>
                      <tr style={{ backgroundColor: '#cce5ff' }}>
                        <td style={{ padding: 6 }}>
                          <EditableCell cellId="cell-1">
                            {content['cell-1'] || initialContent['cell-1']}
                          </EditableCell>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tbody>
                      <tr style={{ backgroundColor: '##d3d3d3' }}>
                        <td style={{ padding: 6 }}>Relevante energet. Variablen</td>
                      </tr>
                      <tr style={{ backgroundColor: '#cce5ff' }}>
                        <td style={{ padding: 6 }}>
                          <EditableCell cellId="cell-2">
                            {content['cell-2'] || initialContent['cell-2']}
                          </EditableCell>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Flèche entre colonne 1 et 2 */}
              <div style={{ marginTop: 50 }}>→</div>
              
              {/* Colonne 2 */}
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ 
                  background: 'white', 
                  padding: '8px 12px', 
                  borderRadius: 5, 
                  fontWeight: 'bold', 
                  fontSize: 14,
                  marginBottom: 6,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                  Energetische Bewertung
                </div>
                <div style={{ 
                  background: 'white', 
                  padding: 10, 
                  borderRadius: 5,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  fontSize: 12
                }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 10 }}>
                    <tbody>
                      <tr style={{ backgroundColor: '#d3d3d3' }}>
                        <td style={{ padding: 6 }}>Analyse Energieeinsatz</td>
                      </tr>
                      <tr style={{ backgroundColor: '#cce5ff' }}>
                        <td style={{ padding: 6 }}>
                          <EditableCell cellId="cell-3">
                            {content['cell-3'] || initialContent['cell-3']}
                          </EditableCell>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 10 }}>
                    <tbody>
                      <tr style={{ backgroundColor: '#d3d3d3' }}>
                        <td style={{ padding: 6 }}>Wesentliche Energiebereiche</td>
                      </tr>
                      <tr style={{ backgroundColor: '#cce5ff' }}>
                        <td style={{ padding: 6 }}>
                          <EditableCell cellId="cell-4">
                            {content['cell-4'] || initialContent['cell-4']}
                          </EditableCell>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tbody>
                      <tr style={{ backgroundColor: '#d3d3d3' }}>
                        <td style={{ padding: 6 }}>Verbesserungpotenziale</td>
                      </tr>
                      <tr style={{ backgroundColor: '#cce5ff' }}>
                        <td style={{ padding: 6 }}>
                          <EditableCell cellId="cell-5">
                            {content['cell-5'] || initialContent['cell-5']}
                          </EditableCell>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              
              {/* Flèche entre colonne 2 et 3 */}
              <div style={{ marginTop: 50 }}>→</div>
              
              {/* Colonne 3 */}
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ 
                  background: 'white', 
                  padding: '8px 12px', 
                  borderRadius: 5, 
                  fontWeight: 'bold', 
                  fontSize: 14,
                  marginBottom: 6,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
                }}>
                  Ergebnisse der Planung
                </div>
                <div style={{ 
                  background: 'white', 
                  padding: 10, 
                  borderRadius: 5,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  fontSize: 12
                }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 10 }}>
                    <tbody>
                      <tr style={{ backgroundColor: '#d3d3d3' }}>
                        <td style={{ padding: 6 }}>Energet. Ausgangsbasis</td>
                      </tr>
                      <tr style={{ backgroundColor: '#cce5ff' }}>
                        <td style={{ padding: 6 }}>
                          <EditableCell cellId="cell-6">
                            {content['cell-6'] || initialContent['cell-6']}
                          </EditableCell>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 10 }}>
                    <tbody>
                      <tr style={{ backgroundColor: '#d3d3d3' }}>
                        <td style={{ padding: 6 }}>EnPIs / KPIs</td>
                      </tr>
                      <tr style={{ backgroundColor: '#cce5ff' }}>
                        <td style={{ padding: 6 }}>
                          <EditableCell cellId="cell-7">
                            {content['cell-7'] || initialContent['cell-7']}
                          </EditableCell>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 10 }}>
                    <tbody>
                      <tr style={{ backgroundColor: '#d3d3d3' }}>
                        <td style={{ padding: 6 }}>Strategische Ziele</td>
                      </tr>
                      <tr style={{ backgroundColor: '#cce5ff' }}>
                        <td style={{ padding: 6 }}>
                          <EditableCell cellId="cell-8">
                            {content['cell-8'] || initialContent['cell-8']}
                          </EditableCell>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: 10 }}>
                    <tbody>
                      <tr style={{ backgroundColor: '#d3d3d3' }}>
                        <td style={{ padding: 6 }}>Operative Ziele</td>
                      </tr>
                      <tr style={{ backgroundColor: '#cce5ff' }}>
                        <td style={{ padding: 6 }}>
                          <EditableCell cellId="cell-9">
                            {content['cell-9'] || initialContent['cell-9']}
                          </EditableCell>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tbody>
                      <tr style={{ backgroundColor: '#d3d3d3' }}>
                        <td style={{ padding: 6 }}>Aktionspläne</td>
                      </tr>
                      <tr style={{ backgroundColor: '#cce5ff' }}>
                        <td style={{ padding: 6 }}>
                          <EditableCell cellId="cell-10">
                            {content['cell-10'] || initialContent['cell-10']}
                          </EditableCell>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            
            {/* Séparateur vertical */}
            <div style={{ 
              width: 1, 
              background: '#aaa', 
              margin: '0 20px', 
              height: '80%', 
              alignSelf: 'center' 
            }}></div>
            
            {/* Partie droite - Energieeinsatz (4 colonnes) */}
            <div style={{ 
              display: 'flex', 
              flex: 4, 
              gap: 10, 
              minWidth: 880, 
              padding: '0 20px', 
              flexDirection: 'column' 
            }}>
              
              {/* Ligne supérieure avec les 4 tableaux */}
              <div style={{ display: 'flex', gap: 10, width: '100%' }}>
                
                {/* Colonne 1 - Energiebezug */}
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ 
                    background: 'white', 
                    padding: 10, 
                    borderRadius: 5,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                    fontSize: 12,
                    marginTop: 28,
                    height: 180
                  }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', height: '100%' }}>
                      <tbody>
                        <tr style={{ backgroundColor: '#d3d3d3' }}>
                          <td style={{ padding: 6, textAlign: 'center' }}>Energiebezug</td>
                        </tr>
                        <tr style={{ backgroundColor: '#cce5ff' }}>
                          <td style={{ padding: 6, height: '100%', verticalAlign: 'top' }}>
                            <EditableCell cellId="cell-11">
                              {content['cell-11'] || initialContent['cell-11']}
                            </EditableCell>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Flèche entre colonne 1 et 2 */}
                <div style={{ marginTop: 50 }}>→</div>
                
                {/* Colonne 2 - Primärenergieeinsatz */}
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ 
                    background: 'white', 
                    padding: 10, 
                    borderRadius: 5,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                    fontSize: 12,
                    marginTop: 28,
                    height: 180
                  }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', height: '100%' }}>
                      <tbody>
                        <tr style={{ backgroundColor: '#d3d3d3' }}>
                          <td style={{ padding: 6, textAlign: 'center' }}>Primärenergieeinsatz</td>
                        </tr>
                        <tr style={{ backgroundColor: '#cce5ff' }}>
                          <td style={{ padding: 6, height: '100%', verticalAlign: 'top' }}>
                            <EditableCell cellId="cell-12">
                              {content['cell-12'] || initialContent['cell-12']}
                            </EditableCell>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Flèche entre colonne 2 et 3 */}
                <div style={{ marginTop: 50 }}>→</div>
                
                {/* Colonne 3 - Energieumwandkung/-output */}
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ 
                    background: 'white', 
                    padding: 10, 
                    borderRadius: 5,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                    fontSize: 12,
                    marginTop: 28,
                    height: 180
                  }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', height: '100%' }}>
                      <tbody>
                        <tr style={{ backgroundColor: '#d3d3d3' }}>
                          <td style={{ padding: 6, textAlign: 'center' }}>Energieumwandkung/-output</td>
                        </tr>
                        <tr style={{ backgroundColor: '#cce5ff' }}>
                          <td style={{ padding: 6, height: '100%', verticalAlign: 'top' }}>
                            <EditableCell cellId="cell-13">
                              {content['cell-13'] || initialContent['cell-13']}
                            </EditableCell>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
                
                {/* Flèche entre colonne 3 et 4 */}
                <div style={{ marginTop: 50 }}>→</div>
                
                {/* Colonne 4 - Energieeinsatzort */}
                <div style={{ flex: 1.5, minWidth: 300 }}>
                  <div style={{ 
                    background: 'white', 
                    padding: 10, 
                    borderRadius: 5,
                    boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                    fontSize: 12,
                    marginTop: 28,
                    height: 180
                  }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', height: '100%' }}>
                      <tbody>
                        <tr style={{ backgroundColor: '#d3d3d3' }}>
                          <td style={{ padding: 6, textAlign: 'center' }}>Energieeinsatzort</td>
                        </tr>
                        <tr style={{ backgroundColor: '#cce5ff' }}>
                          <td style={{ padding: 6, height: '100%', verticalAlign: 'top' }}>
                            <EditableCell cellId="cell-14">
                              {content['cell-14'] || initialContent['cell-14']}
                            </EditableCell>
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
              
              {/* Tableau SEUs en dessous */}
              <div style={{ 
                background: 'white', 
                padding: 10, 
                borderRadius: 5,
                boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                fontSize: 12,
                marginTop: 20,
                width: '100%'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <tbody>
                    <tr style={{ backgroundColor: '#d3d3d3' }}>
                      <td style={{ padding: 6, textAlign: 'center', width: '50%' }}>SEUs</td>
                      <td style={{ padding: 6, backgroundColor: '#cce5ff' }}>
                        <EditableCell cellId="cell-15">
                          {content['cell-15'] || initialContent['cell-15']}
                        </EditableCell>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </Content>
    </Layout>
  );
};

export default EnergyPlanning;