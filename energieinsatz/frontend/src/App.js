import React, { useState, useEffect, useCallback } from 'react';
import { 
  Button, 
  Typography, 
  Layout,
  notification,
  Tooltip
} from 'antd';
import { EditOutlined, SaveOutlined, CloseOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const { Content } = Layout;

const EnergyPlanning = () => {
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState({});
  
  // NOUVEAU LIEN SEUs
  const newSEUsLink = 'https://app.powerbi.com/view?r=eyJrIjoiYjI0YmNhMTYtNzZjNi00Mjg2LTkxZGUtNDAzZGJjN2Q4NzZlIiwidCI6ImVlZjIzZTliLTJhMzctNGIzNi04ZGU1LWU0YzUwMTc5ZDE0NyIsImMiOjh9';

  const [initialContent] = useState({
    'cell-1': '<a style="color: #004085; text-decoration: none;" href="/energieeinsatz" target="_blank" rel="noopener noreferrer">siehe Reiter "Energieeinsatz"</a>',
    'cell-2': '<ul style="padding-left: 20px; margin: 0;"><li>exogen</li><li>Materialfreiheit</li><li>Außentemperatur / Wetter</li><li>endogen (Anlagen, Anlagensteuerung)</li></ul>',
    'cell-3': '<a style="color: #004085; text-decoration: none;" href="https://app.powerbi.com/view?r=eyJrIjoiOTMwZDZkODUtZWQ2Yy00ZGQ3LThlNjktYWY5YjVlNzA0YjNkIiwidCI6ImVlZjIzZTliLTJhMzctNGIzNi04ZGU1LWU0YzUwMTc5ZDE0NyIsImMiOjh9" target="_blank" rel="noopener noreferrer">Siehe Tabellenblatt "Übersicht &amp; Energieverteilung"</a>',
    'cell-4': 'Strom, Presse1, Presse2, Kran, UBC_Aufbereitung, Lüftung &amp; Druckluft Kratzhalle, mobiles Equipment, Kraftstoff (Diesel), Bagger, Radlader, Stapler',
    'cell-5': '<a style="color: #004085; text-decoration: none;" href="http://4.231.103.159:6081/?page_id=1700" target="_blank" rel="noopener noreferrer">Siehe Tabellenblatt "Energiepotentialanalyse"</a>',
    'cell-6': '2015<br>für Aktionszentrum<br>→ Basis 2020',
    'cell-7': '<a style="color: #004085; text-decoration: none;" href="http://4.231.103.159:6081/?page_id=1853" target="_blank" rel="noopener noreferrer">siehe Tabellenblatt "EnPIs"</a>',
    'cell-8': '<a style="color: #004085; text-decoration: none;" href="http://4.231.103.159:6081/?page_id=1752" target="_blank" rel="noopener noreferrer">siehe Tabellenblatt "Ziele &amp; Aktionen"</a>',
    'cell-9': '<a style="color: #004085; text-decoration: none;" href="http://4.231.103.159:6081/?page_id=1752" target="_blank" rel="noopener noreferrer">siehe Tabellenblatt "Ziele &amp; Aktionen"</a>',
    'cell-10': '<a style="color: #004085; text-decoration: none;" href="http://4.231.103.159:6081/?page_id=1752" target="_blank" rel="noopener noreferrer">siehe Tabellenblatt "Ziele &amp; Aktionen"</a>',
    'cell-11': '<div style="text-align: left;">Primärenergie</div><div style="text-align: right;">Diesel</div><div style="text-align: right;">Erdgas</div><div style="text-align: left;">Sekundärenergie</div><div style="text-align: right;">Fremdstrom</div>',
    'cell-12': '<div style="height: 12px;"></div><div style="height: 12px;"></div><div style="text-align: left;">Heizungkessel</div><div style="height: 12px;"></div><div style="height: 12px;"></div><div style="text-align: left;">Druckluftkompressoren</div>',
    'cell-13': '<div style="height: 12px;"></div><div style="height: 12px;"></div><div style="text-align: left;">warm</div><div style="height: 12px;"></div><div style="height: 12px;"></div><div style="text-align: left;">Druckluft</div>',
    // NOUVEAU TABLEAU Energieeinsatzort RESTRUCTURÉ AVEC TOOLTIPS
    'cell-14': `<div style="display: flex; justify-content: space-between; align-items: flex-start; height: 100%; padding: 0 5px;">
      <!-- Colonne 1: V -->
      <div style="display: flex; flex-direction: column; align-items: center; min-width: 30px;">
        <div style="font-weight: bold; margin-bottom: 3px; cursor: help;" title="Vorbehandlung">V</div>
        <div style="height: 8px;"></div>
        <div>✓</div>
        <div style="height: 8px;"></div>
        <div>✓</div>
      </div>
      
      <!-- Colonne 2: H -->
      <div style="display: flex; flex-direction: column; align-items: center; min-width: 30px;">
        <div style="font-weight: bold; margin-bottom: 3px; cursor: help;" title="Halle">H</div>
        <div style="height: 24px;"></div>
        <div>✓</div>
      </div>
      
      <!-- Colonne 3: GP -->
      <div style="display: flex; flex-direction: column; align-items: center; min-width: 30px;">
        <div style="font-weight: bold; margin-bottom: 3px; cursor: help;" title="Grobpressen">GP</div>
        <div style="height: 24px;"></div>
        <div>✓</div>
        <div style="height: 8px;"></div>
        <div>✓</div>
      </div>
      
      <!-- Colonne 4: K -->
      <div style="display: flex; flex-direction: column; align-items: center; min-width: 30px;">
        <div style="font-weight: bold; margin-bottom: 3px; cursor: help;" title="Kratzen">K</div>
        <div style="height: 24px;"></div>
        <div>✓</div>
      </div>
      
      <!-- Colonne 5: DP -->
      <div style="display: flex; flex-direction: column; align-items: center; min-width: 30px;">
        <div style="font-weight: bold; margin-bottom: 3px; cursor: help;" title="Detailpressen">DP</div>
        <div style="height: 24px;"></div>
        <div>✓</div>
      </div>
      
      <!-- Colonne 6: KH -->
      <div style="display: flex; flex-direction: column; align-items: center; min-width: 30px;">
        <div style="font-weight: bold; margin-bottom: 3px; cursor: help;" title="Kratzhalle">KH</div>
        <div style="height: 24px;"></div>
        <div>✓</div>
        <div style="height: 8px;"></div>
        <div>✓</div>
      </div>
      
      <!-- Colonne 7: W -->
      <div style="display: flex; flex-direction: column; align-items: center; min-width: 30px;">
        <div style="font-weight: bold; margin-bottom: 3px; cursor: help;" title="Werkstatt">W</div>
        <div style="height: 24px;"></div>
        <div>✓</div>
        <div style="height: 8px;"></div>
        <div>✓</div>
      </div>
      
      <!-- Colonne 8: AB -->
      <div style="display: flex; flex-direction: column; align-items: center; min-width: 30px;">
        <div style="font-weight: bold; margin-bottom: 3px; cursor: help;" title="Abfalldeponie">AB</div>
        <div style="height: 24px;"></div>
        <div>✓</div>
      </div>
      
      <!-- Colonne 9: FZ -->
      <div style="display: flex; flex-direction: column; align-items: center; min-width: 30px;">
        <div style="font-weight: bold; margin-bottom: 3px; cursor: help;" title="Fahrzeuge">FZ</div>
        <div style="height: 24px;"></div>
        <div>✓</div>
      </div>
    </div>`,
    // NOUVEAU LIEN SEUs
    'cell-15': `<a style="color: #004085; text-decoration: none;" href="${newSEUsLink}" target="_blank" rel="noopener noreferrer">Siehe Reiter "SEUs"</a>`
  });

  // Version pour gérer les mises à jour du contenu - INCREMENTEE
  const [contentVersion] = useState('v4');

  // Correction et mise à jour du localStorage
  useEffect(() => {
    const storageKey = 'energyPlanningContent';
    const versionKey = 'energyPlanningVersion';
    
    const currentVersion = localStorage.getItem(versionKey);
    const savedContent = localStorage.getItem(storageKey);

    // Si la version a changé ou si le contenu n'existe pas, réinitialiser avec le nouveau contenu
    if (currentVersion !== contentVersion || !savedContent) {
      console.log('Mise à jour du contenu vers la version:', contentVersion);
      localStorage.setItem(storageKey, JSON.stringify(initialContent));
      localStorage.setItem(versionKey, contentVersion);
      setContent(initialContent);
    } else {
      try {
        const parsedContent = JSON.parse(savedContent);
        setContent(parsedContent);
      } catch (error) {
        console.error('Erreur lors du parsing du contenu sauvegardé:', error);
        localStorage.setItem(storageKey, JSON.stringify(initialContent));
        localStorage.setItem(versionKey, contentVersion);
        setContent(initialContent);
      }
    }
  }, [initialContent, contentVersion, newSEUsLink]);

  const loadContent = useCallback(() => {
    const savedContent = localStorage.getItem('energyPlanningContent');
    if (savedContent) {
      try {
        const parsedContent = JSON.parse(savedContent);
        setContent(parsedContent);
      } catch (error) {
        console.error('Erreur lors du chargement du contenu:', error);
        setContent(initialContent);
      }
    } else {
      setContent(initialContent);
    }
  }, [initialContent]);

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
    localStorage.setItem('energyPlanningContent', JSON.stringify(content));
    notification.success({
      message: 'Änderungen erfolgreich gespeichert',
      description: 'Alle Modifikationen wurden im System gesichert.',
      duration: 2,
      placement: 'topRight'
    });
  };

  const cancelEdit = () => {
    setEditMode(false);
    loadContent();
    notification.info({
      message: 'Bearbeitungsmodus deaktiviert',
      description: 'Die vorgenommenen Änderungen wurden verworfen.',
      duration: 2,
      placement: 'topRight'
    });
  };

  // Composant spécial pour la cellule 14 avec Tooltips Antd
  const EnergyUsageLocationCell = ({ cellId }) => {
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

    // Définition des tooltips pour chaque lettre
    const letterTooltips = {
      'V': 'Vorbehandlung',
      'H': 'Halle', 
      'GP': 'Grobpressen',
      'K': 'Kratzen',
      'DP': 'Detailpressen',
      'KH': 'Kratzhalle',
      'W': 'Werkstatt',
      'AB': 'Abfalldeponie',
      'FZ': 'Fahrzeuge'
    };

    // Composant d'affichage normal avec Tooltips Antd
    const renderWithTooltips = () => (
      <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', height: '100%', padding: '0 5px'}}>
        {/* Colonne V */}
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '30px'}}>
          <Tooltip title="Vorbehandlung">
            <div style={{fontWeight: 'bold', marginBottom: '3px', cursor: 'help'}}>V</div>
          </Tooltip>
          <div style={{height: '8px'}}></div>
          <div>✓</div>
          <div style={{height: '8px'}}></div>
          <div>✓</div>
        </div>
        
        {/* Colonne H */}
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '30px'}}>
          <Tooltip title="Halle">
            <div style={{fontWeight: 'bold', marginBottom: '3px', cursor: 'help'}}>H</div>
          </Tooltip>
          <div style={{height: '24px'}}></div>
          <div>✓</div>
        </div>
        
        {/* Colonne GP */}
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '30px'}}>
          <Tooltip title="Grobpressen">
            <div style={{fontWeight: 'bold', marginBottom: '3px', cursor: 'help'}}>GP</div>
          </Tooltip>
          <div style={{height: '24px'}}></div>
          <div>✓</div>
          <div style={{height: '8px'}}></div>
          <div>✓</div>
        </div>
        
        {/* Colonne K */}
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '30px'}}>
          <Tooltip title="Kratzen">
            <div style={{fontWeight: 'bold', marginBottom: '3px', cursor: 'help'}}>K</div>
          </Tooltip>
          <div style={{height: '24px'}}></div>
          <div>✓</div>
        </div>
        
        {/* Colonne DP */}
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '30px'}}>
          <Tooltip title="Detailpressen">
            <div style={{fontWeight: 'bold', marginBottom: '3px', cursor: 'help'}}>DP</div>
          </Tooltip>
          <div style={{height: '24px'}}></div>
          <div>✓</div>
        </div>
        
        {/* Colonne KH */}
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '30px'}}>
          <Tooltip title="Kratzhalle">
            <div style={{fontWeight: 'bold', marginBottom: '3px', cursor: 'help'}}>KH</div>
          </Tooltip>
          <div style={{height: '24px'}}></div>
          <div>✓</div>
          <div style={{height: '8px'}}></div>
          <div>✓</div>
        </div>
        
        {/* Colonne W */}
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '30px'}}>
          <Tooltip title="Werkstatt">
            <div style={{fontWeight: 'bold', marginBottom: '3px', cursor: 'help'}}>W</div>
          </Tooltip>
          <div style={{height: '24px'}}></div>
          <div>✓</div>
          <div style={{height: '8px'}}></div>
          <div>✓</div>
        </div>
        
        {/* Colonne AB */}
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '30px'}}>
          <Tooltip title="Abfalldeponie">
            <div style={{fontWeight: 'bold', marginBottom: '3px', cursor: 'help'}}>AB</div>
          </Tooltip>
          <div style={{height: '24px'}}></div>
          <div>✓</div>
        </div>
        
        {/* Colonne FZ */}
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', minWidth: '30px'}}>
          <Tooltip title="Fahrzeuge">
            <div style={{fontWeight: 'bold', marginBottom: '3px', cursor: 'help'}}>FZ</div>
          </Tooltip>
          <div style={{height: '24px'}}></div>
          <div>✓</div>
        </div>
      </div>
    );

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
          renderWithTooltips()
        )}
      </div>
    );
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

    // Si c'est la cellule 14, utiliser le composant spécial
    if (cellId === 'cell-14') {
      return <EnergyUsageLocationCell cellId={cellId} />;
    }

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

          <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 16, gap: 8 }}>
            {editMode ? (
              <>
                <Button 
                  icon={<SaveOutlined />} 
                  onClick={saveChanges} 
                  style={{ 
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

          <div style={{ 
            display: 'flex', 
            flexWrap: 'nowrap', 
            alignItems: 'flex-start', 
            background: 'white', 
            padding: '20px 0', 
            borderRadius: 8 
          }}>
            
            <div style={{ 
              display: 'flex', 
              flex: 3, 
              gap: 10, 
              minWidth: 660, 
              padding: '0 20px' 
            }}>
              
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
                      <tr style={{ backgroundColor: '#d3d3d3' }}>
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
              
              <div style={{ marginTop: 50 }}>→</div>
              
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
              
              <div style={{ marginTop: 50 }}>→</div>
              
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
            
            <div style={{ 
              width: 1, 
              background: '#aaa', 
              margin: '0 20px', 
              height: '80%', 
              alignSelf: 'center' 
            }}></div>
            
            <div style={{ 
              display: 'flex', 
              flex: 4, 
              gap: 10, 
              minWidth: 880, 
              padding: '0 20px', 
              flexDirection: 'column' 
            }}>
              
              <div style={{ display: 'flex', gap: 10, width: '100%' }}>
                
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
                
                <div style={{ marginTop: 50 }}>→</div>
                
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
                
                <div style={{ marginTop: 50 }}>→</div>
                
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
                
                <div style={{ marginTop: 50 }}>→</div>
                
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
                          <td style={{ padding: '6px', textAlign: 'center' }} colSpan={9}>
                            Energieeinsatzort
                          </td>
                        </tr>
                        <tr style={{ backgroundColor: '#cce5ff' }}>
                          <td style={{ padding: '6px', height: '100%', verticalAlign: 'top' }} colSpan={9}>
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