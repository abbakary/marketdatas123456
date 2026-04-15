// Shared dataset card matching /public/datasets card structure exactly
import { Calendar, FileIcon, HardDrive, Download, ChevronUp, MoreVertical } from 'lucide-react';
import { useTheme } from '../../../context/ThemeContext';
import { useThemeColors } from '../../../utils/useThemeColors';


export const allDatasets = [
  { id: 'd1', title: 'Global Climate Data 2024', author: 'GreenData Inc.', category: 'Agriculture and Environment', subcategory: 'Environment & Climate', usability: '10.0', updated: 'Updated 2 days ago', files: '3 Files (CSV)', size: '2.5 GB', downloads: '1,245 downloads', votes: 48, notebooks: 12, image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80', price: '299.00', status: 'approved', sellerId: 's1', sellerName: 'GreenData Inc.', revenue: 372255, rating: 4.8, description: 'Comprehensive climate data including temperature, precipitation, and atmospheric readings from 2024.', avatars: ['https://i.pravatar.cc/40?img=11', 'https://i.pravatar.cc/40?img=14'], format: 'CSV, JSON', license: 'CC BY 4.0', createdAt: new Date('2024-01-15') },
  { id: 'd2', title: 'Financial Markets Analysis', author: 'FinTech Solutions', category: 'Finance and Investment', subcategory: 'Finance & Banking', usability: '9.8', updated: 'Updated 5 days ago', files: '2 Files (CSV)', size: '1.8 GB', downloads: '892 downloads', votes: 35, notebooks: 8, image: 'https://images.unsplash.com/photo-1460925895917-adf4e5d1baaa?auto=format&fit=crop&w=900&q=80', price: '599.00', status: 'approved', sellerId: 's2', sellerName: 'FinTech Solutions', revenue: 534308, rating: 4.9, description: 'Historical stock market data with technical indicators and financial analytics.', avatars: ['https://i.pravatar.cc/40?img=21', 'https://i.pravatar.cc/40?img=25'], format: 'CSV, Excel', license: 'CC BY 4.0', createdAt: new Date('2024-02-01') },
  { id: 'd3', title: 'Healthcare Patient Records', author: 'MedData Corp', category: 'Social Services', subcategory: 'Health', usability: '9.5', updated: 'Updated 1 day ago', files: '4 Files (JSON)', size: '5.2 GB', downloads: '0 downloads', votes: 0, notebooks: 0, image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80', price: '899.00', status: 'pending', sellerId: 's3', sellerName: 'MedData Corp', revenue: 0, rating: 0, description: 'Anonymized patient data for healthcare research and analysis.', avatars: ['https://i.pravatar.cc/40?img=31'], format: 'JSON, XML', license: 'Research Only', createdAt: new Date('2024-03-25') },
  { id: 'd4', title: 'AI Training Dataset - Images', author: 'AIDataHub', category: 'Computer Science', subcategory: 'Artificial Intelligence', usability: '10.0', updated: 'Updated 3 days ago', files: '5 Files (Images)', size: '15 GB', downloads: '2,100 downloads', votes: 67, notebooks: 24, image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80', price: '899.00', status: 'approved', sellerId: 's1', sellerName: 'AIDataHub', revenue: 1887900, rating: 4.9, description: 'Large-scale image dataset for machine learning model training with labeled annotations.', avatars: ['https://i.pravatar.cc/40?img=41', 'https://i.pravatar.cc/40?img=43'], format: 'Images, JSON', license: 'CC BY 4.0', createdAt: new Date('2024-04-05') },
  { id: 'd5', title: 'Crop Yield Data 2024', author: 'AgriResearch', category: 'Agriculture and Environment', subcategory: 'Agriculture', usability: '9.2', updated: 'Updated 10 days ago', files: '2 Files (CSV)', size: '340 MB', downloads: '0 downloads', votes: 0, notebooks: 0, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80', price: '199.00', status: 'pending', sellerId: 's4', sellerName: 'AgriResearch', revenue: 0, rating: 0, description: 'Agricultural data covering crop yields across multiple regions and seasons.', avatars: ['https://i.pravatar.cc/40?img=51'], format: 'CSV', license: 'Open Data', createdAt: new Date('2024-05-10') },
  { id: 'd6', title: 'Urban Development Stats', author: 'CityData Labs', category: 'Urban Development and Housing', subcategory: 'Urban Development', usability: '9.7', updated: 'Updated 7 days ago', files: '3 Files (CSV)', size: '1.2 GB', downloads: '560 downloads', votes: 29, notebooks: 6, image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80', price: '349.00', status: 'approved', sellerId: 's2', sellerName: 'CityData Labs', revenue: 195440, rating: 4.5, description: 'City planning and urban development statistics from major metropolitan areas.', avatars: ['https://i.pravatar.cc/40?img=61', 'https://i.pravatar.cc/40?img=63'], format: 'CSV, Excel', license: 'CC BY 4.0', createdAt: new Date('2024-06-15') },
  { id: 'd7', title: 'Consumer Behavior Analysis', author: 'RetailInsights', category: 'Trade and Industry', subcategory: 'Trade & Commerce', usability: '8.9', updated: 'Updated 15 days ago', files: '1 File (CSV)', size: '800 MB', downloads: '0 downloads', votes: 0, notebooks: 0, image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=900&q=80', price: '449.00', status: 'rejected', sellerId: 's3', sellerName: 'RetailInsights', revenue: 0, rating: 0, description: 'Retail consumer behavior and purchasing patterns from e-commerce platforms.', avatars: ['https://i.pravatar.cc/40?img=71'], format: 'CSV', license: 'Proprietary', createdAt: new Date('2024-07-20') },
  { id: 'd8', title: 'Genomics Research Data', author: 'BioData Institute', category: 'Social Services', subcategory: 'Research & Innovation', usability: '10.0', updated: 'Updated 4 days ago', files: '6 Files (CSV, JSON)', size: '8.4 GB', downloads: '340 downloads', votes: 52, notebooks: 18, image: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86e81?auto=format&fit=crop&w=900&q=80', price: '799.00', status: 'approved', sellerId: 's4', sellerName: 'BioData Institute', revenue: 271660, rating: 4.7, description: 'Comprehensive genomics data for biological research and medical studies.', avatars: ['https://i.pravatar.cc/40?img=81', 'https://i.pravatar.cc/40?img=83'], format: 'CSV, JSON, FASTA', license: 'Research Only', createdAt: new Date('2024-08-25') },
  { id: 'd9', title: 'Social Media Analytics 2024', author: 'SocialMetrics', category: 'ICT and Digital Economy', subcategory: 'Digital Economy / Technology', usability: '9.6', updated: 'Updated 6 days ago', files: '4 Files (CSV)', size: '1.2 GB', downloads: '1,102 downloads', votes: 44, notebooks: 15, image: 'https://images.unsplash.com/photo-1516110833967-0b5442fabffd?auto=format&fit=crop&w=900&q=80', price: '349.00', status: 'approved', sellerId: 's1', sellerName: 'SocialMetrics', revenue: 384598, rating: 4.7, description: 'Social media engagement metrics, trends, and user behavior analytics.', avatars: ['https://i.pravatar.cc/40?img=91', 'https://i.pravatar.cc/40?img=93'], format: 'CSV, JSON', license: 'CC BY 4.0', createdAt: new Date('2024-02-15') },
  { id: 'd10', title: 'Real Estate Market Data', author: 'PropData Inc.', category: 'Urban Development and Housing', subcategory: 'Real Estate / Housing', usability: '9.4', updated: 'Updated 12 days ago', files: '3 Files (CSV)', size: '3.1 GB', downloads: '0 downloads', votes: 0, notebooks: 0, image: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=900&q=80', price: '799.00', status: 'pending', sellerId: 's2', sellerName: 'PropData Inc.', revenue: 0, rating: 0, description: 'Real estate market trends, property valuations, and housing statistics.', avatars: ['https://i.pravatar.cc/40?img=101'], format: 'CSV, Excel', license: 'CC BY 4.0', createdAt: new Date('2024-03-28') },
  { id: 'd11', title: 'Transportation Logistics Data', author: 'LogiData', category: 'Infrastructure and Transport', subcategory: 'Logistics & Supply Chain', usability: '9.3', updated: 'Updated 9 days ago', files: '2 Files (CSV)', size: '2.0 GB', downloads: '423 downloads', votes: 31, notebooks: 7, image: 'https://images.unsplash.com/photo-1552820728-8ac41f1ce891?auto=format&fit=crop&w=900&q=80', price: '549.00', status: 'approved', sellerId: 's3', sellerName: 'LogiData', revenue: 232227, rating: 4.5, description: 'Supply chain and logistics data including routes, costs, and delivery metrics.', avatars: ['https://i.pravatar.cc/40?img=111', 'https://i.pravatar.cc/40?img=113'], format: 'CSV, JSON', license: 'CC BY 4.0', createdAt: new Date('2024-01-25') },
  { id: 'd12', title: 'Energy Consumption Patterns', author: 'EnergyStats', category: 'Natural Resources and Energy', subcategory: 'Energy (Electricity, Oil, Gas, Renewables)', usability: '9.8', updated: 'Updated 8 days ago', files: '5 Files (CSV)', size: '4.2 GB', downloads: '678 downloads', votes: 38, notebooks: 11, image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80', price: '449.00', status: 'approved', sellerId: 's4', sellerName: 'EnergyStats', revenue: 304722, rating: 4.6, description: 'Global energy consumption patterns, renewable energy adoption, and carbon footprint data.', avatars: ['https://i.pravatar.cc/40?img=121', 'https://i.pravatar.cc/40?img=123'], format: 'CSV, JSON', license: 'Open Data', createdAt: new Date('2024-09-10') },
];

const PRIMARY = '#FF8C00'; // Orange
const SECONDARY = '#20B2AA'; // Teal

export function DatasetCard({ dataset, onAction, actionLabel, actionStyle, showStatus = false, compact = false }) {
  const { isDarkMode } = useTheme();
  const themeColors = useThemeColors();

  const statusColors = {
    approved: { bg: isDarkMode ? '#1e3a1e' : '#F0FFF4', color: '#38A169', label: 'Approved' },
    pending: { bg: isDarkMode ? '#3a2f1b' : '#FFFAF0', color: '#DD6B20', label: 'Pending' },
    rejected: { bg: isDarkMode ? '#3a1e1e' : '#FFF5F5', color: '#E53E3E', label: 'Rejected' },
  };
  const sc = statusColors[dataset.status] || statusColors.approved;

  return (
    <div style={{
      borderRadius: 16, overflow: 'hidden', backgroundColor: themeColors.card,
      border: `1px solid ${themeColors.border}`,
      boxShadow: isDarkMode ? '0 4px 6px -1px rgba(0,0,0,0.3)' : '0 4px 6px -1px rgba(0,0,0,0.05)',
      transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)', display: 'flex', flexDirection: 'column',
      cursor: 'pointer',
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translateY(-6px)';
        e.currentTarget.style.boxShadow = isDarkMode ? '0 20px 25px -5px rgba(0,0,0,0.5), 0 10px 10px -5px rgba(0,0,0,0.3)' : '0 20px 25px -5px rgba(0,0,0,0.1), 0 10px 10px -5px rgba(0,0,0,0.04)';
        e.currentTarget.style.borderColor = PRIMARY;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = '';
        e.currentTarget.style.boxShadow = isDarkMode ? '0 4px 6px -1px rgba(0,0,0,0.3)' : '0 4px 6px -1px rgba(0,0,0,0.05)';
        e.currentTarget.style.borderColor = themeColors.border;
      }}
    >
      {/* Image */}
      <div style={{ height: compact ? 120 : 160, backgroundImage: `url(${dataset.image})`, backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative', flexShrink: 0 }}>
        {showStatus && (
          <span style={{ 
            position: 'absolute', top: 12, right: 12, padding: '4px 10px', borderRadius: 8, 
            fontSize: 11, fontWeight: 700, background: sc.bg, color: sc.color,
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)', textTransform: 'uppercase', letterSpacing: '0.05em'
          }}>
            {sc.label}
          </span>
        )}
      </div>

      {/* Content */}
      <div style={{ padding: compact ? '16px' : '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 8, marginBottom: 8 }}>
          <p style={{ fontSize: compact ? 14 : 16, fontWeight: 700, color: themeColors.text, margin: 0, lineHeight: 1.4, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
            {dataset.title}
          </p>
          <MoreVertical size={16} color={themeColors.textMuted} style={{ flexShrink: 0, marginTop: 2 }} />
        </div>

        <p style={{ fontSize: 13, color: themeColors.textMuted, fontWeight: 600, margin: '0 0 10px' }}>{dataset.author}</p>

        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 16, fontSize: 12, color: themeColors.textMuted }}>
          <span>Visibility <b style={{ color: PRIMARY }}>{dataset.usability}</b></span>
          <Calendar size={12} />
          <span>{dataset.updated}</span>
        </div>

        {/* File Details Grid */}
        <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', gap: 8, marginBottom: 16, paddingBottom: 16, borderBottom: `1px solid ${themeColors.border}` }}>
          {[
            { icon: <FileIcon size={16} color={SECONDARY} />, label: dataset.files },
            { icon: <HardDrive size={16} color={SECONDARY} />, label: dataset.size },
            { icon: <Download size={16} color={SECONDARY} />, label: dataset.downloads },
          ].map((item, i) => (
            <div key={i} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 4, padding: '8px 12px', borderRadius: 10, background: themeColors.hoverBg, transition: 'background 0.2s', flex: 1, justifyContent: 'center' }}>
              {item.icon}
              <span style={{ fontSize: 10, color: themeColors.textMuted, fontWeight: 600, whiteSpace: 'nowrap' }}>{item.label}</span>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
          <div style={{ display: 'flex', alignItems: 'center', border: `1px solid ${themeColors.border}`, borderRadius: 8, overflow: 'hidden', background: themeColors.card }}>
            <div style={{ padding: '4px 10px', borderRight: `1px solid ${themeColors.border}`, display: 'flex', alignItems: 'center', color: themeColors.textMuted }}>
              <ChevronUp size={14} />
            </div>
            <div style={{ padding: '4px 12px' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: themeColors.text }}>{dataset.votes}</span>
            </div>
          </div>

          {onAction ? (
            <button onClick={(e) => { e.stopPropagation(); onAction(dataset); }}
              style={{ padding: '8px 18px', borderRadius: 8, fontSize: 13, fontWeight: 700, border: 'none', cursor: 'pointer', background: PRIMARY, color: '#fff', boxShadow: isDarkMode ? '0 4px 6px rgba(255,140,0,0.4)' : '0 4px 6px rgba(255,140,0,0.2)', transition: 'all 0.2s', ...actionStyle }}>
              {actionLabel || 'View'}
            </button>
          ) : (
            <div style={{ padding: '6px 14px', background: isDarkMode ? `${SECONDARY}25` : `${SECONDARY}15`, borderRadius: 8, fontSize: 14, fontWeight: 700, color: SECONDARY }}>
              ${dataset.price} USD
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DatasetCard;
