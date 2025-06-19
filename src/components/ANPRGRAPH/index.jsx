import React, { useState, useEffect } from 'react';
import { Line, Pie, Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip, 
  Legend 
} from 'chart.js';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Tooltip, 
  Legend
);

// Animation variants
const fadeInLeft = {
  hidden: { opacity: 0, x: -50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const fadeInRight = {
  hidden: { opacity: 0, x: 50 },
  visible: { 
    opacity: 1, 
    x: 0,
    transition: { duration: 0.8, ease: "easeOut" }
  }
};

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, ease: "easeOut" }
  }
};

const AnimatedSection = ({ children, variants, className = '' }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={variants}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const AnimatedStatCard = ({ stat, index }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      variants={fadeInUp}
      transition={{ delay: index * 0.1 }}
      style={{
        backgroundColor: 'white',
        borderRadius: '8px',
        padding: '15px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        borderLeft: `4px solid ${stat.color}`,
        minHeight: '100px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        transition: 'transform 0.3s ease',
        cursor: 'pointer',
        ':hover': {
          transform: 'translateY(-5px)'
        }
      }}
    >
      <div style={{ 
        color: '#666',
        fontSize: '14px',
        marginBottom: '8px',
        wordBreak: 'break-word'
      }}>
        {stat.label}
      </div>
      <div style={{ 
        color: '#333',
        fontSize: '24px',
        fontWeight: 'bold'
      }}>
        {stat.value.toLocaleString()}
      </div>
    </motion.div>
  );
};

function Dashboard() {
  // Filter options
  const FILTER_OPTIONS = ['Daily', 'Weekly', 'Monthly'];
  const [selectedFilter, setSelectedFilter] = useState(FILTER_OPTIONS[0]);
  const [showFilters, setShowFilters] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);
   const colors = {
    primary: {
      blue: '#3A86FF',
      purple: '#8338EC',
      pink: '#FF006E',
      orange: '#FB5607',
      yellow: '#FFBE0B'
    },
    secondary: {
      lightBlue: '#00B4D8',
      teal: '#00C49A',
      green: '#2EC4B6',
      coral: '#FF6B6B',
      lavender: '#A78BFA'
    },
    shades: {
      darkBlue: '#1E3A8A',
      darkPurple: '#5E17EB',
      darkPink: '#D1005E',
      darkOrange: '#E04D00',
      darkYellow: '#E6A800'
    }
  };

  // ANPR data for different time periods
  const anprData = {
    Daily: {
      labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
      total: [300, 250, 400, 350, 280, 180],
      detected: [210, 100, 250, 250, 265, 170],
      undetected: [80, 50, 110, 70, 15, 10],
      blacklist: [10, 100, 40, 30, 6, 3]
    },
    Weekly: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      total: [850, 920, 880, 950, 1000, 1100, 950],
      detected: [800, 870, 830, 900, 950, 1040, 900],
      undetected: [50, 50, 50, 50, 50, 60, 50],
      blacklist: [15, 18, 20, 22, 25, 30, 20]
    },
    Monthly: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      total: [3500, 3800, 4000, 4200],
      detected: [3300, 3600, 3800, 4000],
      undetected: [200, 200, 200, 200],
      blacklist: [80, 90, 100, 110]
    }
  };

  // FR Camera data for different time periods
  const frData = {
    Daily: {
      labels: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00'],
      total: [280, 230, 380, 320, 260, 150],
      recognized: [200, 90, 240, 220, 245, 140],
      unrecognized: [70, 40, 100, 60, 10, 5],
      blacklist: [10, 100, 40, 40, 5, 5]
    },
    Weekly: {
      labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
      total: [800, 850, 820, 900, 950, 1000, 900],
      recognized: [750, 800, 770, 850, 900, 950, 850],
      unrecognized: [50, 50, 50, 50, 50, 50, 50],
      blacklist: [10, 15, 18, 20, 22, 25, 15]
    },
    Monthly: {
      labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4'],
      total: [3200, 3500, 3700, 3900],
      recognized: [3000, 3300, 3500, 3700],
      unrecognized: [200, 200, 200, 200],
      blacklist: [70, 80, 90, 100]
    }
  };

  // Current data based on selected filter
  const currentAnprData = anprData[selectedFilter];
  const currentFrData = frData[selectedFilter];

  // ANPR Pie Chart Data
  const anprPieData = {
    labels: ['Detected Vehicles', 'Undetected Vehicles'],
    datasets: [
      {
        data: [
          currentAnprData.detected.reduce((a, b) => a + b, 0),
          currentAnprData.undetected.reduce((a, b) => a + b, 0)
        ],
        backgroundColor: [colors.primary.blue, colors.secondary.coral],
        hoverBackgroundColor: [colors.shades.darkBlue, colors.secondary.coral],
        borderWidth: 1
      }
    ]
  };

  // FR Pie Chart Data
  const frPieData = {
    labels: ['Recognized Faces', 'Unrecognized Faces'],
    datasets: [
      {
        data: [
          currentFrData.recognized.reduce((a, b) => a + b, 0),
          currentFrData.unrecognized.reduce((a, b) => a + b, 0)
        ],
        backgroundColor: [colors.primary.purple, colors.secondary.pink],
        hoverBackgroundColor: [colors.shades.darkPurple, colors.secondary.pink],
        borderWidth: 1
      }
    ]
  };

  // FR Column Chart Data (Recognized vs Unrecognized)
  const anprBarData = {
    labels: currentAnprData.labels,
    datasets: [
      {
        label: 'Detected Vehicles',
        data: currentAnprData.detected,
        backgroundColor: colors.primary.blue,
        borderColor: colors.shades.darkBlue,
        borderWidth: 1
      },
      {
        label: 'Undetected Vehicles',
        data: currentAnprData.undetected,
        backgroundColor: colors.secondary.coral,
        borderColor: colors.secondary.coral,
        borderWidth: 1
      }
    ]
  };

  // Common Chart Options with animations
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label || context.label}: ${context.parsed.y || context.raw}`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true
      }
    },
    // Animation configurations
    animation: {
      duration: 1000,
      easing: 'easeOutQuart',
      animateScale: true,
      animateRotate: true
    },
    transitions: {
      show: {
        animations: {
          x: {
            from: 0
          },
          y: {
            from: 0
          }
        }
      },
      hide: {
        animations: {
          x: {
            to: 0
          },
          y: {
            to: 0
          }
        }
      }
    }
  };

  // Pie Chart specific options with enhanced animations
  const pieOptions = {
    ...chartOptions,
    plugins: {
      ...chartOptions.plugins,
      tooltip: {
        callbacks: {
          label: function(context) {
            const total = context.dataset.data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((context.raw / total) * 100);
            return `${context.label}: ${context.raw} (${percentage}%)`;
          }
        }
      }
    },
    animation: {
      ...chartOptions.animation,
      animateScale: true,
      animateRotate: true
    }
  };

  // ANPR Line Chart Data
   const anprLineData = {
    labels: currentAnprData.labels,
    datasets: [
      {
        label: 'Total Vehicles',
        data: currentAnprData.total,
        borderColor: colors.secondary.teal,
        backgroundColor: colors.secondary.teal,
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 2
      },
      {
        label: 'Detected Vehicles',
        data: currentAnprData.detected,
        borderColor: colors.primary.blue,
        backgroundColor: colors.primary.blue,
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 2
      },
      {
        label: 'UnDetected Vehicles',
        data: currentAnprData.undetected,
        borderColor: colors.secondary.coral,
        backgroundColor: colors.secondary.coral,
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 2
      },
      {
        label: 'Blacklist Vehicles',
        data: currentAnprData.blacklist,
        borderColor: colors.primary.yellow,
        backgroundColor: colors.primary.yellow,
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 2
      }
    ]
  };

  // FR Line Chart Data
  const frLineData = {
    labels: currentFrData.labels,
    datasets: [
      {
        label: 'Total Faces',
        data: currentFrData.total,
        borderColor: colors.primary.purple,
        backgroundColor: colors.primary.purple,
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 2
      },
      {
        label: 'Recognized Faces',
        data: currentFrData.recognized,
        borderColor: colors.secondary.lavender,
        backgroundColor: colors.secondary.lavender,
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 2
      },
      {
        label: 'Unrecognized Faces',
        data: currentFrData.unrecognized,
        borderColor: colors.primary.pink,
        backgroundColor: colors.primary.pink,
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 2
      },
      {
        label: 'Blacklist Faces',
        data: currentFrData.blacklist,
        borderColor: colors.primary.orange,
        backgroundColor: colors.primary.orange,
        borderWidth: 2,
        tension: 0.3,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointBackgroundColor: '#fff',
        pointBorderWidth: 2
      }
    ]
  };

  // Bar Chart specific options with animations
  const barOptions = {
    ...chartOptions,
    animation: {
      ...chartOptions.animation,
      delay: (context) => {
        if (context.type === 'data' && context.mode === 'default') {
          return context.dataIndex * 100;
        }
        return 0;
      }
    }
  };

  const toggleFilters = () => {
    setShowFilters(!showFilters);
  };

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    setShowFilters(false);
  };

  return (
    <div style={{ 
      maxWidth: '1500px', 
      margin: '0 auto',
      padding: '20px',
      borderRadius: '8px'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '20px'
      }}>
        <h1 style={{ margin: 0 }}>Security Cameras Dashboard</h1>
        
        {/* Filter Button */}
        <div style={{ position: 'relative' }}>
          <button 
            onClick={toggleFilters}
            style={{
              padding: '8px 16px',
              backgroundColor: 'white',
              color: '#333',
              border: '1px solid #ddd',
              borderRadius: '4px',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontSize: '14px',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M22 3H2l8 9.46V19l4 2v-8.54L22 3z"/>
            </svg>
            {selectedFilter}
          </button>

          {/* Filter Dropdown */}
          {showFilters && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              style={{
                position: 'absolute',
                right: 0,
                top: '100%',
                backgroundColor: 'white',
                border: '1px solid #ddd',
                borderRadius: '4px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
                zIndex: 10,
                minWidth: '120px'
              }}
            >
              {FILTER_OPTIONS.map((filter) => (
                <div
                  key={filter}
                  onClick={() => handleFilterSelect(filter)}
                  style={{
                    padding: '10px 16px',
                    cursor: 'pointer',
                    backgroundColor: filter === selectedFilter ? '#f0f0f0' : 'white',
                    ':hover': {
                      backgroundColor: '#f5f5f5'
                    }
                  }}
                >
                  {filter}
                </div>
              ))}
            </motion.div>
          )}
        </div>
      </div>

      {/* Top Charts - Line Charts */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        marginBottom: '20px'
      }}>
        {/* ANPR Chart Container - Fade from left */}
        <AnimatedSection variants={fadeInLeft}>
          <div style={{ 
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s ease',
            ':hover': {
              transform: 'translateY(-5px)'
            }
          }}>
            <h3 style={{ marginTop: 0 }}>ANPR Camera Data</h3>
            <div style={{ height: '300px' }}>
              <Line 
                data={anprLineData} 
                options={{
                  ...chartOptions, 
                  scales: {
                    ...chartOptions.scales, 
                    y: { 
                      ...chartOptions.scales.y, 
                      title: { 
                        display: true, 
                        text: 'Number of Vehicles' 
                      } 
                    } 
                  },
                  animation: {
                    ...chartOptions.animation,
                    delay: (context) => {
                      if (context.type === 'data' && context.mode === 'default') {
                        return context.dataIndex * 50;
                      }
                      return 0;
                    }
                  }
                }} 
              />
            </div>
          </div>
        </AnimatedSection>

        {/* FR Chart Container - Fade from right */}
        <AnimatedSection variants={fadeInRight}>
          <div style={{ 
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s ease',
            ':hover': {
              transform: 'translateY(-5px)'
            }
          }}>
            <h3 style={{ marginTop: 0 }}>FR Camera Data</h3>
            <div style={{ height: '300px' }}>
              <Line 
                data={frLineData} 
                options={{
                  ...chartOptions, 
                  scales: {
                    ...chartOptions.scales, 
                    y: { 
                      ...chartOptions.scales.y, 
                      title: { 
                        display: true, 
                        text: 'Number of Faces' 
                      } 
                    } 
                  },
                  animation: {
                    ...chartOptions.animation,
                    delay: (context) => {
                      if (context.type === 'data' && context.mode === 'default') {
                        return context.dataIndex * 50;
                      }
                      return 0;
                    }
                  }
                }} 
              />
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Bottom Charts - Bar and Pie Charts */}
      <div style={{ 
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px',
        marginBottom: '20px'
      }}>
        {/* ANPR Bar Chart - Fade from left */}
        <AnimatedSection variants={fadeInLeft}>
          <div style={{ 
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '20px',
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s ease',
            ':hover': {
              transform: 'translateY(-5px)'
            }
          }}>
            <h3 style={{ marginTop: 0 }}>ANPR Recognition Analysis</h3>
            <div style={{ height: '300px' }}>
              <Bar 
                data={anprBarData} 
                options={barOptions} 
              />
            </div>
          </div>
        </AnimatedSection>
        
        {/* FR Pie Chart - Fade from right */}
        <AnimatedSection variants={fadeInRight}>
          <div style={{
            backgroundColor: 'white',
            borderRadius: '8px',
            padding: '10px',
            margin:"auto",
            boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
            transition: 'transform 0.3s ease',
            ':hover': {
              transform: 'translateY(-5px)'
            }
          }}>
            <h3 style={{ marginTop: 0 }}>FR Recognition Distribution</h3>
            <div style={{ height: '300px' }}>
              <Pie 
                data={frPieData} 
                options={{
                  ...pieOptions,
                  animation: {
                    ...pieOptions.animation,
                    animateRotate: true,
                    animateScale: true
                  }
                }} 
              />
            </div>
          </div>
        </AnimatedSection>
      </div>

      {/* Stats Summary */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: '20px'
      }}>
        {/* ANPR Stats - Fade from left */}
         <AnimatedSection variants={fadeInLeft}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gap: '15px'
          }}>
            {[
              { label: 'Total Vehicles', value: currentAnprData.total.reduce((a, b) => a + b, 0), color: colors.secondary.teal },
              { label: 'Detected Vehicles', value: currentAnprData.detected.reduce((a, b) => a + b, 0), color: colors.primary.blue },
              { label: 'Undetected Vehicles', value: currentAnprData.undetected.reduce((a, b) => a + b, 0), color: colors.secondary.coral },
              { label: 'Blacklist Vehicles', value: currentAnprData.blacklist.reduce((a, b) => a + b, 0), color: colors.primary.yellow }
            ].map((stat, index) => (
              <AnimatedStatCard key={`anpr-${index}`} stat={stat} index={index} />
            ))}
          </div>
        </AnimatedSection>

        {/* FR Stats - Fade from right */}
         <AnimatedSection variants={fadeInRight}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, minmax(0, 1fr))',
            gap: '15px'
          }}>
            {[
              { label: 'Total Faces', value: currentFrData.total.reduce((a, b) => a + b, 0), color: colors.primary.purple },
              { label: 'Recognized Faces', value: currentFrData.recognized.reduce((a, b) => a + b, 0), color: colors.secondary.lavender },
              { label: 'Unrecognized Faces', value: currentFrData.unrecognized.reduce((a, b) => a + b, 0), color: colors.primary.pink },
              { label: 'Blacklist Faces', value: currentFrData.blacklist.reduce((a, b) => a + b, 0), color: colors.primary.orange }
            ].map((stat, index) => (
              <AnimatedStatCard key={`fr-${index}`} stat={stat} index={index} />
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

export default Dashboard;