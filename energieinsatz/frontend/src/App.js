import React, { useState, useEffect, useCallback } from 'react';
import { 
  Button, 
  Typography, 
  Layout,
  notification,
  Tooltip
} from 'antd';
import { 
  EditOutlined, 
  SaveOutlined, 
  CloseOutlined, 
  SettingOutlined,
  BarChartOutlined,
  CheckCircleOutlined,
  ThunderboltOutlined,
  FireOutlined,
  SyncOutlined,
  EnvironmentOutlined,
  TeamOutlined,
  ApartmentOutlined
} from '@ant-design/icons';

const { Title, Text } = Typography;
const { Content } = Layout;

const EnergyPlanning = () => {
  const [editMode, setEditMode] = useState(false);
  const [content, setContent] = useState({});
  
  // NOUVEAU LIEN SEU
  const newSEUsLink = 'https://app.powerbi.com/view?r=eyJrIjoiYjI0YmNhMTYtNzZjNi00Mjg2LTkxZGUtNDAzZGJjN2Q4NzZlIiwidCI6ImVlZjIzZTliLTJhMzctNGIzNi04ZGU1LWU0YzUwMTc5ZDE0NyIsImMiOjh9';

  const [initialContent] = useState({
    'cell-1': '<a style="color: #004085; text-decoration: none;" href="/energieeinsatz" target="_blank" rel="noopener noreferrer">Siehe "Energieeinsatz"</a>',
    'cell-2': '<ul style="padding-left: 20px; margin: 0;"><li>exogen</li><li>Materialfreiheit</li><li>Außentemperatur / Wetter</li><li>endogen (Anlagen, Anlagensteuerung)</li></ul>',
    'cell-3': '<a style="color: #004085; text-decoration: none;" href="https://app.powerbi.com/view?r=eyJrIjoiOTMwZDZkODUtZWQ2Yy00ZGQ3LThlNjktYWY5YjVlNzA0YjNkIiwidCI6ImVlZjIzZTliLTJhMzctNGIzNi04ZGU1LWU0YzUwMTc5ZDE0NyIsImMiOjh9" target="_blank" rel="noopener noreferrer">Siehe "Übersicht &amp; Energieverteilung"</a>',
    'cell-4': 'Strom, Presse1, Presse2, Kran, UBC_Aufbereitung, Lüftung &amp; Druckluft Kratzhalle, mobiles Equipment, Kraftstoff (Diesel), Bagger, Radlader, Stapler',
    'cell-5': '<a style="color: #004085; text-decoration: none;" href="http://4.231.103.159:6081/?page_id=1700" target="_blank" rel="noopener noreferrer">Siehe "Energiepotentialanalyse"</a>',
    'cell-6': '2015<br>für Aktionszentrum<br>→ Basis 2020',
    'cell-7': '<a style="color: #004085; text-decoration: none;" href="http://4.231.103.159:6081/?page_id=1853" target="_blank" rel="noopener noreferrer">Siehe "EnPIs"</a>',
    'cell-8': '<a style="color: #004085; text-decoration: none;" href="http://4.231.103.159:6081/?page_id=1752" target="_blank" rel="noopener noreferrer">Siehe "Ziele &amp; Aktionen"</a>',
    'cell-9': '<a style="color: #004085; text-decoration: none;" href="http://4.231.103.159:6081/?page_id=1752" target="_blank" rel="noopener noreferrer">Siehe "Ziele &amp; Aktionen"</a>',
    'cell-10': '<a style="color: #004085; text-decoration: none;" href="http://4.231.103.159:6081/?page_id=1752" target="_blank" rel="noopener noreferrer">Siehe "Ziele &amp; Aktionen"</a>',
    
    // ENERGYBEZUG - Version professionnelle améliorée
    'cell-11': `
      <div style="display: flex; flex-direction: column; height: 350px; border-radius: 8px; overflow: hidden; border: 1px solid #f0f0f0;">
        <!-- Ligne 1 - Bleu professionnel -->
        <div style="background: linear-gradient(135deg, #f0f8ff 0%, #e6f7ff 100%); border-left: 4px solid #1890ff; padding: 12px 8px; flex: 1; display: flex; align-items: center; border-bottom: 1px solid #e8f4ff;">
          <span style="text-align: left; width: 100%; font-weight: 600; color: #1890ff; font-size: 13px;">Primärenergie</span>
        </div>
        
        <!-- Ligne 2 - Vert professionnel -->
        <div style="background: linear-gradient(135deg, #f6ffed 0%, #f0fff3 100%); border-left: 4px solid #52c41a; padding: 12px 8px; flex: 1; display: flex; align-items: center; border-bottom: 1px solid #e8ffd9;">
          <span style="text-align: right; width: 100%; font-weight: 500; color: #389e0d; font-size: 13px;">Diesel</span>
        </div>
        
        <!-- Ligne 3 - Orange professionnel -->
        <div style="background: linear-gradient(135deg, #fff7e6 0%, #fff2e8 100%); border-left: 4px solid #fa8c16; padding: 12px 8px; flex: 1; display: flex; align-items: center; border-bottom: 1px solid #ffe7ba;">
          <span style="text-align: right; width: 100%; font-weight: 500; color: #d46b08; font-size: 13px;">Erdgas</span>
        </div>
        
        <!-- Ligne 4 - Violet professionnel -->
        <div style="background: linear-gradient(135deg, #f9f0ff 0%, #f0e6ff 100%); border-left: 4px solid #722ed1; padding: 12px 8px; flex: 1; display: flex; align-items: center; border-bottom: 1px solid #efdbff;">
          <span style="width: 100%;"></span>
        </div>
        
        <!-- Ligne 5 - Rouge professionnel -->
        <div style="background: linear-gradient(135deg, #fff2e8 0%, #ffe7e6 100%); border-left: 4px solid #fa541c; padding: 12px 8px; flex: 1; display: flex; align-items: center; border-bottom: 1px solid #ffd8bf;">
          <span style="text-align: left; width: 100%; font-weight: 600; color: #d4380d; font-size: 13px;">Sekundärenergie</span>
        </div>
        
        <!-- Ligne 6 - Jaune professionnel -->
        <div style="background: linear-gradient(135deg, #fcffe6 0%, #feffe6 100%); border-left: 4px solid #a0d911; padding: 12px 8px; flex: 1; display: flex; align-items: center; border-bottom: 1px solid #f4ffb8;">
          <span style="text-align: left; width: 100%; font-weight: 500; color: #5b8c00; font-size: 13px;">Fremdstrom</span>
        </div>
        
        <!-- Ligne 7 - Bleu clair professionnel -->
        <div style="background: linear-gradient(135deg, #e6fffb 0%, #e6f7ff 100%); border-left: 4px solid #13c2c2; padding: 12px 8px; flex: 1; display: flex; align-items: center;">
          <span style="width: 100%;"></span>
        </div>
      </div>
    `,

    // PRIMÄRENERGIEEINSATZ - Version professionnelle améliorée
    'cell-12': `
      <div style="display: flex; flex-direction: column; height: 350px; border-radius: 8px; overflow: hidden; border: 1px solid #f0f0f0;">
        <!-- Ligne 1 - Bleu -->
        <div style="background: linear-gradient(135deg, #f0f8ff 0%, #e6f7ff 100%); border-left: 4px solid #1890ff; padding: 12px 8px; flex: 1; display: flex; align-items: center; border-bottom: 1px solid #e8f4ff;">
          <span style="width: 100%;"></span>
        </div>
        
        <!-- Ligne 2 - Vert -->
        <div style="background: linear-gradient(135deg, #f6ffed 0%, #f0fff3 100%); border-left: 4px solid #52c41a; padding: 12px 8px; flex: 1; display: flex; align-items: center; border-bottom: 1px solid #e8ffd9;">
          <span style="width: 100%;"></span>
        </div>
        
        <!-- Ligne 3 - Orange -->
        <div style="background: linear-gradient(135deg, #fff7e6 0%, #fff2e8 100%); border-left: 4px solid #fa8c16; padding: 12px 8px; flex: 1; display: flex; align-items: center; border-bottom: 1px solid #ffe7ba;">
          <span style="text-align: left; width: 100%; font-weight: 500; color: #d46b08; font-size: 13px;">Heizungskessel</span>
        </div>
        
        <!-- Ligne 4 - Violet -->
        <div style="background: linear-gradient(135deg, #f9f0ff 0%, #f0e6ff 100%); border-left: 4px solid #722ed1; padding: 12px 8px; flex: 1; display: flex; align-items: center; border-bottom: 1px solid #efdbff;">
          <span style="width: 100%;"></span>
        </div>
        
        <!-- Ligne 5 - Rouge -->
        <div style="background: linear-gradient(135deg, #fff2e8 0%, #ffe7e6 100%); border-left: 4px solid #fa541c; padding: 12px 8px; flex: 1; display: flex; align-items: center; border-bottom: 1px solid #ffd8bf;">
          <span style="width: 100%;"></span>
        </div>
        
        <!-- Ligne 6 - Jaune -->
        <div style="background: linear-gradient(135deg, #fcffe6 0%, #feffe6 100%); border-left: 4px solid #a0d911; padding: 12px 8px; flex: 1; display: flex; align-items: center; border-bottom: 1px solid #f4ffb8;">
          <span style="width: 100%;"></span>
        </div>
        
        <!-- Ligne 7 - Bleu clair -->
        <div style="background: linear-gradient(135deg, #e6fffb 0%, #e6f7ff 100%); border-left: 4px solid #13c2c2; padding: 12px 8px; flex: 1; display: flex; align-items: center;">
          <span style="text-align: right; width: 100%; font-weight: 500; color: #08979c; font-size: 13px;">Druckluftkompressoren</span>
        </div>
      </div>
    `,

    // ENERGIUMWANDKUNG/OUTPUT - Version professionnelle améliorée
    'cell-13': `
      <div style="display: flex; flex-direction: column; height: 350px; border-radius: 8px; overflow: hidden; border: 1px solid #f0f0f0;">
        <!-- Ligne 1 - Bleu -->
        <div style="background: linear-gradient(135deg, #f0f8ff 0%, #e6f7ff 100%); border-left: 4px solid #1890ff; padding: 12px 8px; flex: 1; display: flex; align-items: center; border-bottom: 1px solid #e8f4ff;">
          <span style="width: 100%;"></span>
        </div>
        
        <!-- Ligne 2 - Vert -->
        <div style="background: linear-gradient(135deg, #f6ffed 0%, #f0fff3 100%); border-left: 4px solid #52c41a; padding: 12px 8px; flex: 1; display: flex; align-items: center; border-bottom: 1px solid #e8ffd9;">
          <span style="width: 100%;"></span>
        </div>
        
        <!-- Ligne 3 - Orange -->
        <div style="background: linear-gradient(135deg, #fff7e6 0%, #fff2e8 100%); border-left: 4px solid #fa8c16; padding: 12px 8px; flex: 1; display: flex; align-items: center; border-bottom: 1px solid #ffe7ba;">
          <span style="text-align: left; width: 100%; font-weight: 500; color: #d46b08; font-size: 13px;">Wärme</span>
        </div>
        
        <!-- Ligne 4 - Violet -->
        <div style="background: linear-gradient(135deg, #f9f0ff 0%, #f0e6ff 100%); border-left: 4px solid #722ed1; padding: 12px 8px; flex: 1; display: flex; align-items: center; border-bottom: 1px solid #efdbff;">
          <span style="width: 100%;"></span>
        </div>
        
        <!-- Ligne 5 - Rouge -->
        <div style="background: linear-gradient(135deg, #fff2e8 0%, #ffe7e6 100%); border-left: 4px solid #fa541c; padding: 12px 8px; flex: 1; display: flex; align-items: center; border-bottom: 1px solid #ffd8bf;">
          <span style="width: 100%;"></span>
        </div>
        
        <!-- Ligne 6 - Jaune -->
        <div style="background: linear-gradient(135deg, #fcffe6 0%, #feffe6 100%); border-left: 4px solid #a0d911; padding: 12px 8px; flex: 1; display: flex; align-items: center; border-bottom: 1px solid #f4ffb8;">
          <span style="width: 100%;"></span>
        </div>
        
        <!-- Ligne 7 - Bleu clair -->
        <div style="background: linear-gradient(135deg, #e6fffb 0%, #e6f7ff 100%); border-left: 4px solid #13c2c2; padding: 12px 8px; flex: 1; display: flex; align-items: center;">
          <span style="text-align: left; width: 100%; font-weight: 500; color: #08979c; font-size: 13px;">Druckluft</span>
        </div>
      </div>
    `,

    // ENERGIEEINSATZORT - Version professionnelle améliorée
    'cell-14': `
      <div style="display: flex; flex-direction: column; height: 350px; font-size: 12px; border-radius: 8px; overflow: hidden; border: 1px solid #f0f0f0;">
        <!-- Ligne 1 - Bleu -->
        <div style="background: linear-gradient(135deg, #f0f8ff 0%, #e6f7ff 100%); border-left: 4px solid #1890ff; padding: 8px; flex: 1; display: flex; align-items: center; border-bottom: 1px solid #e8f4ff;">
          <table style="width: 100%;">
            <tr>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;"></td>
            </tr>
          </table>
        </div>

        <!-- Ligne 2 - Vert -->
        <div style="background: linear-gradient(135deg, #f6ffed 0%, #f0fff3 100%); border-left: 4px solid #52c41a; padding: 8px; flex: 1; display: flex; align-items: center; border-bottom: 1px solid #e8ffd9;">
          <table style="width: 100%;">
            <tr>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;">
                <div style="background: #52c41a; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto; font-weight: bold; font-size: 12px;">✓</div>
              </td>
            </tr>
          </table>
        </div>

        <!-- Ligne 3 - Orange -->
        <div style="background: linear-gradient(135deg, #fff7e6 0%, #fff2e8 100%); border-left: 4px solid #fa8c16; padding: 8px; flex: 1; display: flex; align-items: center; border-bottom: 1px solid #ffe7ba;">
          <table style="width: 100%;">
            <tr>
              <td style="text-align: center; width: 11.1%;">
                <div style="background: #fa8c16; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto; font-weight: bold; font-size: 12px;">✓</div>
              </td>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;"></td>
            </tr>
          </table>
        </div>

        <!-- Ligne 4 - Violet -->
        <div style="background: linear-gradient(135deg, #f9f0ff 0%, #f0e6ff 100%); border-left: 4px solid #722ed1; padding: 8px; flex: 1; display: flex; align-items: center; border-bottom: 1px solid #efdbff;">
          <table style="width: 100%;">
            <tr>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;"></td>
            </tr>
          </table>
        </div>

        <!-- Ligne 5 - Rouge -->
        <div style="background: linear-gradient(135deg, #fff2e8 0%, #ffe7e6 100%); border-left: 4px solid #fa541c; padding: 8px; flex: 1; display: flex; align-items: center; border-bottom: 1px solid #ffd8bf;">
          <table style="width: 100%;">
            <tr>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;"></td>
            </tr>
          </table>
        </div>

        <!-- Ligne 6 - Jaune -->
        <div style="background: linear-gradient(135deg, #fcffe6 0%, #feffe6 100%); border-left: 4px solid #a0d911; padding: 8px; flex: 1; display: flex; align-items: center; border-bottom: 1px solid #f4ffb8;">
          <table style="width: 100%;">
            <tr>
              <td style="text-align: center; width: 11.1%;">
                <div style="background: #a0d911; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto; font-weight: bold; font-size: 12px;">✓</div>
              </td>
              <td style="text-align: center; width: 11.1%;">
                <div style="background: #a0d911; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto; font-weight: bold; font-size: 12px;">✓</div>
              </td>
              <td style="text-align: center; width: 11.1%;">
                <div style="background: #a0d911; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto; font-weight: bold; font-size: 12px;">✓</div>
              </td>
              <td style="text-align: center; width: 11.1%;">
                <div style="background: #a0d911; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto; font-weight: bold; font-size: 12px;">✓</div>
              </td>
              <td style="text-align: center; width: 11.1%;">
                <div style="background: #a0d911; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto; font-weight: bold; font-size: 12px;">✓</div>
              </td>
              <td style="text-align: center; width: 11.1%;">
                <div style="background: #a0d911; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto; font-weight: bold; font-size: 12px;">✓</div>
              </td>
              <td style="text-align: center; width: 11.1%;">
                <div style="background: #a0d911; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto; font-weight: bold; font-size: 12px;">✓</div>
              </td>
              <td style="text-align: center; width: 11.1%;">
                <div style="background: #a0d911; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto; font-weight: bold; font-size: 12px;">✓</div>
              </td>
              <td style="text-align: center; width: 11.1%;"></td>
            </tr>
          </table>
        </div>

        <!-- Ligne 7 - Bleu clair -->
        <div style="background: linear-gradient(135deg, #e6fffb 0%, #e6f7ff 100%); border-left: 4px solid #13c2c2; padding: 8px; flex: 1; display: flex; align-items: center;">
          <table style="width: 100%;">
            <tr>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;">
                <div style="background: #13c2c2; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto; font-weight: bold; font-size: 12px;">✓</div>
              </td>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;">
                <div style="background: #13c2c2; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto; font-weight: bold; font-size: 12px;">✓</div>
              </td>
              <td style="text-align: center; width: 11.1%;">
                <div style="background: #13c2c2; color: white; border-radius: 50%; width: 20px; height: 20px; display: flex; align-items: center; justify-content: center; margin: 0 auto; font-weight: bold; font-size: 12px;">✓</div>
              </td>
              <td style="text-align: center; width: 11.1%;"></td>
              <td style="text-align: center; width: 11.1%;"></td>
            </tr>
          </table>
        </div>
      </div>
    `,

    // NOUVEAU LIEN SEUs
    'cell-15': `<a style="color: #004085; text-decoration: none;" href="${newSEUsLink}" target="_blank" rel="noopener noreferrer">Siehe "SEUs"</a>`
  });

  // Version pour gérer les mises à jour du contenu - INCREMENTEE
  const [contentVersion] = useState('v14');

  // Correction et mise à jour du localStorage
  useEffect(() => {
    const storageKey = 'energyPlanningContent';
    const versionKey = 'energyPlanningVersion';
    
    const currentVersion = localStorage.getItem(versionKey);
    const savedContent = localStorage.getItem(storageKey);

    if (currentVersion !== contentVersion || !savedContent) {
      console.log('Mise à jour du contenu vers la version:', contentVersion);
      localStorage.setItem(storageKey, JSON.stringify(initialContent));
      localStorage.setItem(versionKey, contentVersion);
      setContent(initialContent);
    } else {
      try {
        const parsedContent = JSON.parse(savedContent);
        const correctedContent = { ...parsedContent };
        
        const correctLinks = (htmlContent) => {
          if (!htmlContent) return htmlContent;
          
          let corrected = htmlContent.replace(/href=""/g, 'href="');
          corrected = corrected.replace(/href="https:/g, 'href="https://');
          corrected = corrected.replace(/href="http:/g, 'href="http://');
          
          if (corrected.includes('Siehe "SEUs"')) {
            corrected = corrected.replace(
              /href="[^"]*"/, 
              `href="${newSEUsLink}"`
            );
          }
          
          return corrected;
        };

        Object.keys(correctedContent).forEach(key => {
          if (typeof correctedContent[key] === 'string') {
            correctedContent[key] = correctLinks(correctedContent[key]);
          }
        });

        if (correctedContent['cell-15'] && !correctedContent['cell-15'].includes('eyJrIjoiYjI0YmNhMTYtNzZjNi00Mjg2LTkxZGUtNDAzZGJjN2Q4NzZl')) {
          correctedContent['cell-15'] = initialContent['cell-15'];
        }

        setContent(correctedContent);
        localStorage.setItem(storageKey, JSON.stringify(correctedContent));
        
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

  const resetToInitialContent = () => {
    localStorage.setItem('energyPlanningContent', JSON.stringify(initialContent));
    localStorage.setItem('energyPlanningVersion', contentVersion);
    setContent(initialContent);
    notification.success({
      message: 'Reinitialisierung',
      description: 'Alle Inhalte wurden auf die ursprünglichen Werte zurückgesetzt.',
      duration: 2,
      placement: 'topRight'
    });
  };

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

  // Composant pour les lettres avec tooltips
  const EnergyEinsatzortHeader = () => {
    const letters = [
      { key: 'V', title: 'Verwaltungsgebäude' },
      { key: 'H', title: 'Heizung' },
      { key: 'GP', title: 'Presse I+II' },
      { key: 'K', title: 'Kran' },
      { key: 'DP', title: 'Dosenpresse' },
      { key: 'KH', title: 'Kratzhalle' },
      { key: 'W', title: 'Werkstatt' },
      { key: 'AB', title: 'Aussenbereich' },
      { key: 'FZ', title: 'mobile Fahrzeuge' }
    ];

    return (
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-around', 
        padding: '8px 0', 
        fontSize: '10px', 
        fontWeight: 'bold',
        height: '30px',
        alignItems: 'center'
      }}>
        {letters.map((letter, index) => (
          <Tooltip key={index} title={letter.title}>
            <span style={{ 
              cursor: 'help', 
              textAlign: 'center', 
              width: '11.1%',
              lineHeight: '1.2'
            }}>
              {letter.key}
            </span>
          </Tooltip>
        ))}
      </div>
    );
  };

  return (
    <Layout style={{ padding: 24, background: 'white', minHeight: '100vh' }}>
      <Content>
        <div style={{ maxWidth: 1800, margin: '0 auto', background: 'white' }}>
          <div style={{ display: 'flex', width: '100%', marginBottom: 16, position: 'relative' }}>
            
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
              
              {/* Eingabeparameter für die Planung */}
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ 
                  background: 'white', 
                  borderRadius: 8,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  border: '1px solid #f0f0f0'
                }}>
                  <div style={{ 
                    backgroundColor: '#d3d3d3', 
                    padding: '12px 6px', 
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottom: '1px solid #f0f0f0'
                  }}>
                    <SettingOutlined style={{ marginRight: 8, color: '#1890ff', fontSize: '16px' }} />
                    Eingabeparameter für die Planung
                  </div>
                  <div style={{ padding: 0 }}>
                    <div style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <div style={{ 
                        backgroundColor: '#d3d3d3', 
                        padding: '6px',
                        fontWeight: 'bold'
                      }}>
                        Energieeinsatz
                      </div>
                      <div style={{ 
                        padding: '10px',
                        backgroundColor: '#cce5ff'
                      }}>
                        <EditableCell cellId="cell-1">
                          {content['cell-1'] || initialContent['cell-1']}
                        </EditableCell>
                      </div>
                    </div>
                    <div style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <div style={{ 
                        backgroundColor: '#d3d3d3', 
                        padding: '6px',
                        fontWeight: 'bold'
                      }}>
                        Relevante energet. Variablen
                      </div>
                      <div style={{ 
                        padding: '10px',
                        backgroundColor: '#cce5ff'
                      }}>
                        <EditableCell cellId="cell-2">
                          {content['cell-2'] || initialContent['cell-2']}
                        </EditableCell>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div style={{ marginTop: 50 }}>→</div>
              
              {/* Energetische Bewertung */}
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ 
                  background: 'white', 
                  borderRadius: 8,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  border: '1px solid #f0f0f0'
                }}>
                  <div style={{ 
                    backgroundColor: '#d3d3d3', 
                    padding: '12px 6px', 
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottom: '1px solid #f0f0f0'
                  }}>
                    <BarChartOutlined style={{ marginRight: 8, color: '#52c41a', fontSize: '16px' }} />
                    Energetische Bewertung
                  </div>
                  <div style={{ padding: 0 }}>
                    <div style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <div style={{ 
                        backgroundColor: '#d3d3d3', 
                        padding: '6px',
                        fontWeight: 'bold'
                      }}>
                        Analyse Energieeinsatz
                      </div>
                      <div style={{ 
                        padding: '10px',
                        backgroundColor: '#cce5ff'
                      }}>
                        <EditableCell cellId="cell-3">
                          {content['cell-3'] || initialContent['cell-3']}
                        </EditableCell>
                      </div>
                    </div>
                    <div style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <div style={{ 
                        backgroundColor: '#d3d3d3', 
                        padding: '6px',
                        fontWeight: 'bold'
                      }}>
                        Wesentliche Energiebereiche
                      </div>
                      <div style={{ 
                        padding: '10px',
                        backgroundColor: '#cce5ff'
                      }}>
                        <EditableCell cellId="cell-4">
                          {content['cell-4'] || initialContent['cell-4']}
                        </EditableCell>
                      </div>
                    </div>
                    <div style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <div style={{ 
                        backgroundColor: '#d3d3d3', 
                        padding: '6px',
                        fontWeight: 'bold'
                      }}>
                        Verbesserungpotenziale
                      </div>
                      <div style={{ 
                        padding: '10px',
                        backgroundColor: '#cce5ff'
                      }}>
                        <EditableCell cellId="cell-5">
                          {content['cell-5'] || initialContent['cell-5']}
                        </EditableCell>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div style={{ marginTop: 50 }}>→</div>
              
              {/* Ergebnisse der Planung */}
              <div style={{ flex: 1, minWidth: 200 }}>
                <div style={{ 
                  background: 'white', 
                  borderRadius: 8,
                  boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                  border: '1px solid #f0f0f0'
                }}>
                  <div style={{ 
                    backgroundColor: '#d3d3d3', 
                    padding: '12px 6px', 
                    textAlign: 'center',
                    fontWeight: 'bold',
                    fontSize: '14px',
                    height: '60px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderBottom: '1px solid #f0f0f0'
                  }}>
                    <CheckCircleOutlined style={{ marginRight: 8, color: '#fa8c16', fontSize: '16px' }} />
                    Ergebnisse der Planung
                  </div>
                  <div style={{ padding: 0 }}>
                    <div style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <div style={{ 
                        backgroundColor: '#d3d3d3', 
                        padding: '6px',
                        fontWeight: 'bold'
                      }}>
                        Energet. Ausgangsbasis
                      </div>
                      <div style={{ 
                        padding: '10px',
                        backgroundColor: '#cce5ff'
                      }}>
                        <EditableCell cellId="cell-6">
                          {content['cell-6'] || initialContent['cell-6']}
                        </EditableCell>
                      </div>
                    </div>
                    <div style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <div style={{ 
                        backgroundColor: '#d3d3d3', 
                        padding: '6px',
                        fontWeight: 'bold'
                      }}>
                        EnPIs / KPIs
                      </div>
                      <div style={{ 
                        padding: '10px',
                        backgroundColor: '#cce5ff'
                      }}>
                        <EditableCell cellId="cell-7">
                          {content['cell-7'] || initialContent['cell-7']}
                        </EditableCell>
                      </div>
                    </div>
                    <div style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <div style={{ 
                        backgroundColor: '#d3d3d3', 
                        padding: '6px',
                        fontWeight: 'bold'
                      }}>
                        Strategische Ziele
                      </div>
                      <div style={{ 
                        padding: '10px',
                        backgroundColor: '#cce5ff'
                      }}>
                        <EditableCell cellId="cell-8">
                          {content['cell-8'] || initialContent['cell-8']}
                        </EditableCell>
                      </div>
                    </div>
                    <div style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <div style={{ 
                        backgroundColor: '#d3d3d3', 
                        padding: '6px',
                        fontWeight: 'bold'
                      }}>
                        Operative Ziele
                      </div>
                      <div style={{ 
                        padding: '10px',
                        backgroundColor: '#cce5ff'
                      }}>
                        <EditableCell cellId="cell-9">
                          {content['cell-9'] || initialContent['cell-9']}
                        </EditableCell>
                      </div>
                    </div>
                    <div style={{ borderBottom: '1px solid #f0f0f0' }}>
                      <div style={{ 
                        backgroundColor: '#d3d3d3', 
                        padding: '6px',
                        fontWeight: 'bold'
                      }}>
                        Aktionspläne
                      </div>
                      <div style={{ 
                        padding: '10px',
                        backgroundColor: '#cce5ff'
                      }}>
                        <EditableCell cellId="cell-10">
                          {content['cell-10'] || initialContent['cell-10']}
                        </EditableCell>
                      </div>
                    </div>
                  </div>
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
              
              <div style={{ display: 'flex', gap: 10, width: '100%', alignItems: 'flex-start' }}>
                
                {/* Energiebezug */}
                <div style={{ flex: 1, minWidth: 150 }}>
                  <div style={{ 
                    background: 'white', 
                    borderRadius: 8,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    height: 410,
                    border: '1px solid #f0f0f0'
                  }}>
                    <div style={{ 
                      backgroundColor: '#d3d3d3', 
                      padding: '12px 6px', 
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: '11px',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderBottom: '1px solid #f0f0f0'
                    }}>
                      <ThunderboltOutlined style={{ marginRight: 6, color: '#1890ff', fontSize: '14px' }} />
                      Energiebezug
                    </div>
                    <div style={{ height: '350px' }}>
                      <EditableCell cellId="cell-11">
                        {content['cell-11'] || initialContent['cell-11']}
                      </EditableCell>
                    </div>
                  </div>
                </div>
                
                <div style={{ marginTop: 205 }}>→</div>
                
                {/* Primärenergieeinsatz */}
                <div style={{ flex: 1, minWidth: 150 }}>
                  <div style={{ 
                    background: 'white', 
                    borderRadius: 8,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    height: 410,
                    border: '1px solid #f0f0f0'
                  }}>
                    <div style={{ 
                      backgroundColor: '#d3d3d3', 
                      padding: '12px 6px', 
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: '11px',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderBottom: '1px solid #f0f0f0'
                    }}>
                      <FireOutlined style={{ marginRight: 6, color: '#52c41a', fontSize: '14px' }} />
                      Primärenergieeinsatz
                    </div>
                    <div style={{ height: '350px' }}>
                      <EditableCell cellId="cell-12">
                        {content['cell-12'] || initialContent['cell-12']}
                      </EditableCell>
                    </div>
                  </div>
                </div>
                
                <div style={{ marginTop: 205 }}>→</div>
                
                {/* Energieumwandlung/-output */}
                <div style={{ flex: 1, minWidth: 150 }}>
                  <div style={{ 
                    background: 'white', 
                    borderRadius: 8,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    height: 410,
                    border: '1px solid #f0f0f0'
                  }}>
                    <div style={{ 
                      backgroundColor: '#d3d3d3', 
                      padding: '12px 6px', 
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: '10px',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      lineHeight: '1.2',
                      borderBottom: '1px solid #f0f0f0'
                    }}>
                      <SyncOutlined style={{ marginRight: 6, color: '#fa8c16', fontSize: '14px' }} />
                      Energieumwandlung/-output
                    </div>
                    <div style={{ height: '350px' }}>
                      <EditableCell cellId="cell-13">
                        {content['cell-13'] || initialContent['cell-13']}
                      </EditableCell>
                    </div>
                  </div>
                </div>
                
                <div style={{ marginTop: 205 }}>→</div>
                
                {/* Energieeinsatzort */}
                <div style={{ flex: 1.5, minWidth: 300 }}>
                  <div style={{ 
                    background: 'white', 
                    borderRadius: 8,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                    height: 410,
                    border: '1px solid #f0f0f0'
                  }}>
                    <div style={{ 
                      backgroundColor: '#d3d3d3', 
                      padding: '6px 6px', 
                      textAlign: 'center',
                      fontWeight: 'bold',
                      fontSize: '11px',
                      height: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderBottom: '1px solid #f0f0f0'
                    }}>
                      <EnvironmentOutlined style={{ marginRight: 6, color: '#722ed1', fontSize: '14px' }} />
                      Energieeinsatzort
                    </div>
                    <div style={{ 
                      backgroundColor: '#d3d3d3',
                      height: '30px',
                      borderBottom: '1px solid #f0f0f0'
                    }}>
                      <EnergyEinsatzortHeader />
                    </div>
                    <div style={{ height: '350px' }}>
                      <EditableCell cellId="cell-14">
                        {content['cell-14'] || initialContent['cell-14']}
                      </EditableCell>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Tableau SEUs poussé vers le bas */}
              <div style={{ marginTop: 40 }}>
                <div style={{ 
                  background: 'white', 
                  padding: 10, 
                  borderRadius: 8,
                  boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
                  fontSize: 12,
                  width: '100%',
                  border: '1px solid #f0f0f0'
                }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <tbody>
                      <tr style={{ backgroundColor: '#d3d3d3' }}>
                        <td style={{ padding: 6, textAlign: 'center', width: '50%' }}>
                          <TeamOutlined style={{ marginRight: 6, color: '#13c2c2', fontSize: '14px' }} />
                          SEUs
                        </td>
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

    
         
           
    
        </div>
      </Content>
    </Layout>
  );
};

export default EnergyPlanning;