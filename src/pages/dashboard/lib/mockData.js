export const mockUsers = [
  { id: '1', name: 'John Admin', email: 'admin@dalidata.com', role: 'admin', status: 'active', createdAt: new Date('2024-01-15'), avatar: 'JA' },
  { id: '2', name: 'Sarah Editor', email: 'editor@dalidata.com', role: 'editor', status: 'active', createdAt: new Date('2024-02-20'), avatar: 'SE' },
  { id: '3', name: 'Mike Seller', email: 'seller@dalidata.com', role: 'seller', status: 'active', createdAt: new Date('2024-03-10'), avatar: 'MS' },
  { id: '4', name: 'Jane Buyer', email: 'buyer@dalidata.com', role: 'buyer', status: 'active', createdAt: new Date('2024-04-05'), avatar: 'JB' },
  { id: '5', name: 'Tom Viewer', email: 'viewer@dalidata.com', role: 'viewer', status: 'active', createdAt: new Date('2024-05-01'), avatar: 'TV' },
  { id: '6', name: 'Alice Chen', email: 'alice@example.com', role: 'buyer', status: 'active', createdAt: new Date('2024-06-12'), avatar: 'AC' },
  { id: '7', name: 'Bob Wilson', email: 'bob@example.com', role: 'seller', status: 'inactive', createdAt: new Date('2024-07-08'), avatar: 'BW' },
  { id: '8', name: 'Carol Davis', email: 'carol@example.com', role: 'viewer', status: 'suspended', createdAt: new Date('2024-08-15'), avatar: 'CD' },
  { id: '9', name: 'Dan Brown', email: 'dan@example.com', role: 'editor', status: 'active', createdAt: new Date('2024-09-20'), avatar: 'DB' },
  { id: '10', name: 'Eva Martinez', email: 'eva@example.com', role: 'buyer', status: 'active', createdAt: new Date('2024-10-25'), avatar: 'EM' },
];

export const mockDatasets = [
  { id: '1', title: 'Global Climate Data 2024', description: 'Comprehensive climate data including temperature, precipitation, and atmospheric readings.', category: 'Agriculture and Environment', subcategory: 'Environment & Climate', price: 299, sellerId: '3', sellerName: 'Mike Seller', status: 'approved', downloads: 1250, rating: 4.8, usability: '10.0', updated: 'Updated 2 days ago', files: '3 Files (CSV)', size: '2.5 GB', downloadsLabel: '1,245 downloads', votes: 48, notebooks: 12, image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=900&q=80', price_label: '299.00', format: 'CSV, JSON', license: 'CC BY 4.0', avatars: ['https://i.pravatar.cc/40?img=11','https://i.pravatar.cc/40?img=14'], createdAt: new Date('2024-01-10') },
  { id: '2', title: 'Healthcare Analytics Dataset', description: 'Anonymized patient data for healthcare research and analysis.', category: 'Social Services', subcategory: 'Health', price: 499, sellerId: '3', sellerName: 'Mike Seller', status: 'approved', downloads: 890, rating: 4.6, usability: '9.8', updated: 'Updated 5 days ago', files: '2 Files (CSV)', size: '1.8 GB', downloadsLabel: '890 downloads', votes: 35, notebooks: 8, image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?auto=format&fit=crop&w=900&q=80', price_label: '499.00', format: 'CSV, Excel', license: 'Research Only', avatars: ['https://i.pravatar.cc/40?img=21','https://i.pravatar.cc/40?img=25'], createdAt: new Date('2024-02-15') },
  { id: '3', title: 'Stock Market Insights', description: 'Historical stock market data with technical indicators.', category: 'Finance and Investment', subcategory: 'Finance & Banking', price: 599, sellerId: '7', sellerName: 'Bob Wilson', status: 'pending', downloads: 0, rating: 0, usability: '9.5', updated: 'Updated 1 day ago', files: '4 Files (CSV)', size: '3.2 GB', downloadsLabel: '0 downloads', votes: 0, notebooks: 0, image: 'https://images.unsplash.com/photo-1460925895917-adf4e5d1baaa?auto=format&fit=crop&w=900&q=80', price_label: '599.00', format: 'CSV', license: 'CC BY 4.0', avatars: ['https://i.pravatar.cc/40?img=31'], createdAt: new Date('2024-03-20') },
  { id: '4', title: 'AI Training Dataset', description: 'Large-scale dataset for machine learning model training.', category: 'Computer Science', subcategory: 'Artificial Intelligence', price: 899, sellerId: '3', sellerName: 'Mike Seller', status: 'approved', downloads: 2100, rating: 4.9, usability: '10.0', updated: 'Updated 3 days ago', files: '5 Files (Images)', size: '15 GB', downloadsLabel: '2,100 downloads', votes: 67, notebooks: 24, image: 'https://images.unsplash.com/photo-1515879218367-8466d910aaa4?auto=format&fit=crop&w=900&q=80', price_label: '899.00', format: 'Images, JSON', license: 'CC BY 4.0', avatars: ['https://i.pravatar.cc/40?img=41','https://i.pravatar.cc/40?img=43'], createdAt: new Date('2024-04-05') },
  { id: '5', title: 'Crop Yield Data', description: 'Agricultural data covering crop yields across multiple regions.', category: 'Agriculture and Environment', subcategory: 'Agriculture', price: 199, sellerId: '7', sellerName: 'Bob Wilson', status: 'pending', downloads: 0, rating: 0, usability: '9.2', updated: 'Updated 10 days ago', files: '2 Files (CSV)', size: '340 MB', downloadsLabel: '0 downloads', votes: 0, notebooks: 0, image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=900&q=80', price_label: '199.00', format: 'CSV', license: 'Open Data', avatars: ['https://i.pravatar.cc/40?img=51'], createdAt: new Date('2024-05-10') },
  { id: '6', title: 'Urban Development Stats', description: 'City planning and urban development statistics.', category: 'Urban Development and Housing', subcategory: 'Urban Development', price: 349, sellerId: '3', sellerName: 'Mike Seller', status: 'approved', downloads: 560, rating: 4.5, usability: '9.7', updated: 'Updated 7 days ago', files: '3 Files (CSV)', size: '1.2 GB', downloadsLabel: '560 downloads', votes: 29, notebooks: 6, image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=900&q=80', price_label: '349.00', format: 'CSV, Excel', license: 'CC BY 4.0', avatars: ['https://i.pravatar.cc/40?img=61','https://i.pravatar.cc/40?img=63'], createdAt: new Date('2024-06-15') },
  { id: '7', title: 'Consumer Behavior Analysis', description: 'Retail consumer behavior and purchasing patterns.', category: 'Trade and Industry', subcategory: 'Trade & Commerce', price: 449, sellerId: '7', sellerName: 'Bob Wilson', status: 'rejected', downloads: 0, rating: 0, usability: '8.9', updated: 'Updated 15 days ago', files: '1 File (CSV)', size: '800 MB', downloadsLabel: '0 downloads', votes: 0, notebooks: 0, image: 'https://images.unsplash.com/photo-1614680376573-df3480f0c6ff?auto=format&fit=crop&w=900&q=80', price_label: '449.00', format: 'CSV', license: 'Proprietary', avatars: ['https://i.pravatar.cc/40?img=71'], createdAt: new Date('2024-07-20') },
  { id: '8', title: 'Genomics Research Data', description: 'Comprehensive genomics data for biological research.', category: 'Social Services', subcategory: 'Research & Innovation', price: 799, sellerId: '3', sellerName: 'Mike Seller', status: 'approved', downloads: 340, rating: 4.7, usability: '10.0', updated: 'Updated 4 days ago', files: '6 Files (CSV, JSON)', size: '8.4 GB', downloadsLabel: '340 downloads', votes: 52, notebooks: 18, image: 'https://images.unsplash.com/photo-1505228395891-9a51e7e86e81?auto=format&fit=crop&w=900&q=80', price_label: '799.00', format: 'CSV, JSON', license: 'Research Only', avatars: ['https://i.pravatar.cc/40?img=81','https://i.pravatar.cc/40?img=83'], createdAt: new Date('2024-08-25') },
  { id: '9', title: 'Social Media Analytics 2024', description: 'Social media engagement metrics, trends, and user behavior analytics.', category: 'ICT and Digital Economy', subcategory: 'Digital Economy / Technology', price: 349, sellerId: '3', sellerName: 'Mike Seller', status: 'approved', downloads: 1102, rating: 4.7, usability: '9.6', updated: 'Updated 6 days ago', files: '4 Files (CSV)', size: '1.2 GB', downloadsLabel: '1,102 downloads', votes: 44, notebooks: 15, image: 'https://images.unsplash.com/photo-1516110833967-0b5442fabffd?auto=format&fit=crop&w=900&q=80', price_label: '349.00', format: 'CSV, JSON', license: 'CC BY 4.0', avatars: ['https://i.pravatar.cc/40?img=91','https://i.pravatar.cc/40?img=93'], createdAt: new Date('2024-02-15') },
  { id: '10', title: 'Energy Consumption Patterns', description: 'Global energy consumption patterns, renewable energy adoption, and carbon footprint data.', category: 'Natural Resources and Energy', subcategory: 'Energy (Electricity, Oil, Gas, Renewables)', price: 449, sellerId: '7', sellerName: 'Bob Wilson', status: 'approved', downloads: 678, rating: 4.6, usability: '9.8', updated: 'Updated 8 days ago', files: '5 Files (CSV)', size: '4.2 GB', downloadsLabel: '678 downloads', votes: 38, notebooks: 11, image: 'https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&w=900&q=80', price_label: '449.00', format: 'CSV, JSON', license: 'Open Data', avatars: ['https://i.pravatar.cc/40?img=121','https://i.pravatar.cc/40?img=123'], createdAt: new Date('2024-09-10') },
];

export const mockPurchases = [
  { id: '1', datasetId: '1', datasetTitle: 'Global Climate Data 2024', buyerId: '4', amount: 299, date: new Date('2024-09-01'), status: 'completed' },
  { id: '2', datasetId: '2', datasetTitle: 'Healthcare Analytics Dataset', buyerId: '4', amount: 499, date: new Date('2024-09-15'), status: 'completed' },
  { id: '3', datasetId: '4', datasetTitle: 'AI Training Dataset', buyerId: '6', amount: 899, date: new Date('2024-10-01'), status: 'completed' },
  { id: '4', datasetId: '6', datasetTitle: 'Urban Development Stats', buyerId: '4', amount: 349, date: new Date('2024-10-10'), status: 'pending' },
  { id: '5', datasetId: '8', datasetTitle: 'Genomics Research Data', buyerId: '10', amount: 799, date: new Date('2024-10-20'), status: 'completed' },
];

export const mockReviews = [
  { id: '1', datasetId: '3', datasetTitle: 'Stock Market Insights', status: 'pending', submittedAt: new Date('2024-11-01') },
  { id: '2', datasetId: '5', datasetTitle: 'Crop Yield Data', status: 'pending', submittedAt: new Date('2024-11-05') },
  { id: '3', datasetId: '1', datasetTitle: 'Global Climate Data 2024', status: 'approved', submittedAt: new Date('2024-10-15'), reviewerId: '2' },
  { id: '4', datasetId: '7', datasetTitle: 'Consumer Behavior Analysis', status: 'rejected', submittedAt: new Date('2024-10-20'), reviewerId: '2' },
];

export const mockListings = [
  { id: '1', title: 'Global Climate Data 2024', price: 299, status: 'active', views: 3200, sales: 1250 },
  { id: '2', title: 'Healthcare Analytics Dataset', price: 499, status: 'active', views: 2100, sales: 890 },
  { id: '4', title: 'AI Training Dataset', price: 899, status: 'active', views: 4500, sales: 2100 },
  { id: '6', title: 'Urban Development Stats', price: 349, status: 'active', views: 1200, sales: 560 },
  { id: '8', title: 'Genomics Research Data', price: 799, status: 'pending', views: 800, sales: 340 },
];

export const mockBookmarks = [
  { id: '1', datasetId: '1', datasetTitle: 'Global Climate Data 2024', addedAt: new Date('2024-10-01') },
  { id: '2', datasetId: '4', datasetTitle: 'AI Training Dataset', addedAt: new Date('2024-10-05') },
  { id: '3', datasetId: '8', datasetTitle: 'Genomics Research Data', addedAt: new Date('2024-10-10') },
];

export const mockViewHistory = [
  { id: '1', datasetId: '1', datasetTitle: 'Global Climate Data 2024', viewedAt: new Date('2024-11-01') },
  { id: '2', datasetId: '2', datasetTitle: 'Healthcare Analytics Dataset', viewedAt: new Date('2024-11-02') },
  { id: '3', datasetId: '4', datasetTitle: 'AI Training Dataset', viewedAt: new Date('2024-11-03') },
  { id: '4', datasetId: '6', datasetTitle: 'Urban Development Stats', viewedAt: new Date('2024-11-04') },
  { id: '5', datasetId: '8', datasetTitle: 'Genomics Research Data', viewedAt: new Date('2024-11-05') },
];

// ─── Project Request / Request mock data ────────────────────────────────────────

export const mockCollaborators = [
  { id: 'c1', name: 'Dr. Aisha Patel', avatar: 'https://i.pravatar.cc/40?img=47', skills: ['AI', 'ML', 'Python'], rating: 4.9, projects: 34, category: 'Computer Science' },
  { id: 'c2', name: 'James Okonkwo', avatar: 'https://i.pravatar.cc/40?img=12', skills: ['Data Engineering', 'SQL', 'Spark'], rating: 4.7, projects: 28, category: 'Finance and Investment' },
  { id: 'c3', name: 'Sofia Reyes', avatar: 'https://i.pravatar.cc/40?img=32', skills: ['NLP', 'Computer Vision', 'TensorFlow'], rating: 4.8, projects: 41, category: 'Computer Science' },
  { id: 'c4', name: 'Liam Chen', avatar: 'https://i.pravatar.cc/40?img=59', skills: ['Genomics', 'R', 'Bioinformatics'], rating: 4.6, projects: 19, category: 'Social Services' },
  { id: 'c5', name: 'Fatima Al-Hassan', avatar: 'https://i.pravatar.cc/40?img=25', skills: ['Climate Modeling', 'GIS', 'Python'], rating: 4.9, projects: 22, category: 'Agriculture and Environment' },
  { id: 'c6', name: 'Marcus Webb', avatar: 'https://i.pravatar.cc/40?img=68', skills: ['FinTech', 'Blockchain', 'Analytics'], rating: 4.5, projects: 15, category: 'Finance and Investment' },
];

export const mockProjectRequests = [
  {
    id: 'pr1', buyerId: '4', buyerName: 'Jane Buyer', buyerAvatar: 'https://i.pravatar.cc/40?img=5',
    title: 'Custom AI Training Dataset for Medical Imaging',
    description: 'Need a curated dataset of annotated X-ray and MRI images for training a diagnostic AI model. Must include DICOM metadata, quality scores, and validation splits. This is for a production healthcare AI system, so accuracy and completeness are critical.',
    category: 'Computer Science', dataType: 'Images', datasetSize: '50GB+',
    budgetMin: 2000, budgetMax: 5000, deadline: '2025-03-01',
    preferredCollaborator: '', openToSuggestions: true,
    priorityLevel: 'High', status: 'BIDDING', sourcePreference: 'Medical institutions, public datasets', attachmentUrl: '',
    createdAt: new Date('2025-01-10'),
    bids: [
      { id: 'b1', collaboratorId: 'c1', collaboratorName: 'Dr. Aisha Patel', collaboratorAvatar: 'https://i.pravatar.cc/40?img=47', price: 3800, deliveryTime: '6 weeks', proposal: 'I have extensive experience with medical imaging datasets and HIPAA compliance. Can deliver 50K annotated images with DICOM metadata, quality validation, and augmentation scripts.', status: 'PENDING' },
      { id: 'b2', collaboratorId: 'c3', collaboratorName: 'Sofia Reyes', collaboratorAvatar: 'https://i.pravatar.cc/40?img=32', price: 4200, deliveryTime: '5 weeks', proposal: 'Specialized in computer vision datasets. Will include quality validation pipeline, augmentation scripts, and train/test/val split. Used successfully in 12+ production AI projects.', status: 'PENDING' },
    ]
  },
  {
    id: 'pr2', buyerId: '4', buyerName: 'Jane Buyer', buyerAvatar: 'https://i.pravatar.cc/40?img=5',
    title: 'Financial Fraud Detection Dataset',
    description: 'Looking for a comprehensive labeled transaction dataset with fraud/non-fraud classifications. Need feature-engineered data ready for ML model training. Must include transaction metadata, merchant info, and customer behavior patterns.',
    category: 'Finance and Investment', dataType: 'CSV', datasetSize: '10-50GB',
    budgetMin: 1500, budgetMax: 3000, deadline: '2025-02-15',
    preferredCollaborator: 'James Okonkwo', openToSuggestions: false,
    priorityLevel: 'Medium', status: 'ACCEPTED', sourcePreference: 'Synthetic or anonymized real data', attachmentUrl: 'https://example.com/fraud-detection-spec.pdf',
    createdAt: new Date('2025-01-05'),
    bids: [
      { id: 'b3', collaboratorId: 'c2', collaboratorName: 'James Okonkwo', collaboratorAvatar: 'https://i.pravatar.cc/40?img=12', price: 2500, deliveryTime: '3 weeks', proposal: 'Expert in financial data pipelines with 8 years experience. Will provide 1M+ transactions with 40+ engineered features including RFM metrics, velocity checks, and behavioral clustering.', status: 'ACCEPTED' },
    ]
  },
  {
    id: 'pr3', buyerId: '6', buyerName: 'Alice Chen', buyerAvatar: 'https://i.pravatar.cc/40?img=9',
    title: 'Climate Change Impact Dataset for Agriculture',
    description: 'Seeking historical climate data correlated with crop yield information across 20+ countries. Need cleaned, enriched data with weather patterns, soil conditions, and yield outcomes. Target is agricultural policy research and sustainability analysis.',
    category: 'Agriculture and Environment', dataType: 'CSV', datasetSize: '1-10GB',
    budgetMin: 800, budgetMax: 2000, deadline: '2025-04-01',
    preferredCollaborator: '', openToSuggestions: true,
    priorityLevel: 'Low', status: 'PENDING', sourcePreference: 'NOAA, FAO, national weather services', attachmentUrl: '',
    createdAt: new Date('2025-01-12'),
    bids: []
  },
  {
    id: 'pr4', buyerId: '10', buyerName: 'Eva Martinez', buyerAvatar: 'https://i.pravatar.cc/40?img=11',
    title: 'E-commerce Customer Behavior Analytics Dataset',
    description: 'Need comprehensive customer behavior data including browsing patterns, purchase history, cart abandonment, and product preferences. Data should cover 6+ months and include demographic and behavioral segmentation.',
    category: 'Trade and Industry', dataType: 'CSV', datasetSize: '10-50GB',
    budgetMin: 1200, budgetMax: 2800, deadline: '2025-03-20',
    preferredCollaborator: '', openToSuggestions: true,
    priorityLevel: 'High', status: 'BIDDING', sourcePreference: 'Anonymized real-world e-commerce platforms', attachmentUrl: '',
    createdAt: new Date('2025-01-15'),
    bids: [
      { id: 'b4', collaboratorId: 'c2', collaboratorName: 'James Okonkwo', collaboratorAvatar: 'https://i.pravatar.cc/40?img=12', price: 2200, deliveryTime: '4 weeks', proposal: 'Can provide comprehensive e-commerce dataset with behavioral features, cohort analysis, and predictive RFM scoring already calculated.', status: 'PENDING' },
    ]
  },
  {
    id: 'pr5', buyerId: '4', buyerName: 'Jane Buyer', buyerAvatar: 'https://i.pravatar.cc/40?img=5',
    title: 'Genomics Research Dataset - Disease Markers',
    description: 'Looking for genetic sequencing data with disease markers and phenotype annotations. Need data from diverse populations with proper consent documentation and quality metrics.',
    category: 'Social Services', dataType: 'Mixed', datasetSize: '50GB+',
    budgetMin: 3500, budgetMax: 7000, deadline: '2025-05-01',
    preferredCollaborator: '', openToSuggestions: true,
    priorityLevel: 'High', status: 'PENDING', sourcePreference: 'GEO, biobanks, research institutions', attachmentUrl: 'https://example.com/genomics-spec.docx',
    createdAt: new Date('2025-01-18'),
    bids: []
  },
  {
    id: 'pr6', buyerId: '6', buyerName: 'Alice Chen', buyerAvatar: 'https://i.pravatar.cc/40?img=9',
    title: 'Urban Smart City Infrastructure Data',
    description: 'Need comprehensive smart city dataset including traffic patterns, air quality, energy consumption, and infrastructure performance metrics across major cities.',
    category: 'Urban Development and Housing', dataType: 'JSON', datasetSize: '10-50GB',
    budgetMin: 2500, budgetMax: 4500, deadline: '2025-04-15',
    preferredCollaborator: '', openToSuggestions: true,
    priorityLevel: 'Medium', status: 'COMPLETED', sourcePreference: 'City sensors, IoT networks, municipal APIs', attachmentUrl: '',
    createdAt: new Date('2024-12-01'),
    bids: [
      { id: 'b5', collaboratorId: 'c5', collaboratorName: 'Fatima Al-Hassan', collaboratorAvatar: 'https://i.pravatar.cc/40?img=25', price: 3800, deliveryTime: '8 weeks', proposal: 'Delivered similar project successfully last year. Can integrate data from 15+ city sources with real-time streaming capability.', status: 'ACCEPTED' },
    ]
  },
];

// ─────────────────────────────────────────────────────────────────────────────

export const adminStats = { totalUsers: 5320, totalDatasets: 1245, totalRevenue: 78450, activeUsers: 3200 };
export const editorStats = { pendingReviews: 34, approvedDatasets: 872, rejectedDatasets: 45, avgReviewTime: '2.4 days' };
export const sellerStats = { totalSales: 12500, activeListings: 25, totalEarnings: 43210, monthlyViews: 8900 };
export const buyerStats = { totalPurchases: 58, wishlistItems: 12, budgetUsed: 6800, budgetLimit: 10000 };
export const viewerStats = { datasetsViewed: 240, bookmarkedItems: 18, viewingStreak: 56, reportsGenerated: 12 };

export const userGrowthData = [
  { month: 'Jan', users: 1200 }, { month: 'Feb', users: 1800 }, { month: 'Mar', users: 2400 },
  { month: 'Apr', users: 3100 }, { month: 'May', users: 3800 }, { month: 'Jun', users: 4500 },
];
export const revenueData = [
  { month: 'Jan', revenue: 12000 }, { month: 'Feb', revenue: 15000 }, { month: 'Mar', revenue: 18500 },
  { month: 'Apr', revenue: 22000 }, { month: 'May', revenue: 28000 }, { month: 'Jun', revenue: 35000 },
];
export const categoryData = [
  { name: 'Technology', value: 35 }, { name: 'Healthcare', value: 25 },
  { name: 'Finance', value: 20 }, { name: 'Environment', value: 12 }, { name: 'Other', value: 8 },
];
export const salesTrendData = [
  { month: 'Jan', sales: 2400 }, { month: 'Feb', sales: 3200 }, { month: 'Mar', sales: 2800 },
  { month: 'Apr', sales: 4100 }, { month: 'May', sales: 3600 }, { month: 'Jun', sales: 4800 },
];
export const contentPerformanceData = [
  { month: 'Jan', approved: 45, rejected: 12 }, { month: 'Feb', approved: 52, rejected: 8 },
  { month: 'Mar', approved: 61, rejected: 15 }, { month: 'Apr', approved: 55, rejected: 10 },
  { month: 'May', approved: 72, rejected: 18 }, { month: 'Jun', approved: 68, rejected: 14 },
];
