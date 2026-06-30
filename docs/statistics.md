---
title: Live Statistics
description: UTMJBC Bot Statistics — Track verified users, emails sent, and community growth over time.
image: https://media.discordapp.net/attachments/1423008246691659898/1521352248779866193/image.png?ex=6a448531&is=6a4333b1&hm=75b044f51e709f66df528d721c97b6b507a935dec42681d7edbc42e34a96ed07&=&format=webp&quality=lossless&width=771&height=770
---

# Live Analytics Dashboard

!!! info "About Live Statistics"
    These metrics are pulled dynamically from the primary shard's HTTP API (`GET /stats/current` and `GET /stats/history`) listening on port `8181`. If you are self-hosting, see the [Self Hosting Guide](self-hosting.md#how-statistics-work--setup) to point this dashboard to your own bot instance.

<style>
:root {
    --accent-gold: #d4940a;
    --accent-teal: #0d9488;
}

.chart-section {
    background: var(--md-default-bg-color);
    border-radius: 0.2rem;
    padding: 24px;
    margin-bottom: 20px;
    border: 0.05rem solid var(--md-default-fg-color--lowest);
    box-shadow: var(--md-shadow-z1);
}

.chart-title {
    color: var(--md-default-fg-color);
    font-size: 1.1rem;
    font-weight: 600;
    margin-bottom: 16px;
    padding-bottom: 12px;
    border-bottom: 0.05rem solid var(--md-default-fg-color--lowest);
}

.chart-wrapper {
    position: relative;
    height: 280px;
}

.controls {
    display: flex;
    gap: 8px;
    margin-bottom: 24px;
    flex-wrap: wrap;
}

.control-btn {
    background: var(--md-default-bg-color);
    border: 0.05rem solid var(--md-default-fg-color--lowest);
    color: var(--md-default-fg-color--light);
    padding: 8px 16px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 0.875rem;
    font-weight: 500;
    transition: all 0.15s ease;
}

.control-btn:hover {
    background: var(--md-code-bg-color);
    border-color: var(--accent-gold);
    color: var(--md-default-fg-color);
}

.control-btn.active {
    background: var(--accent-gold);
    color: white;
    border-color: var(--accent-gold);
}

.legend {
    display: flex;
    gap: 16px;
    margin-top: 12px;
    justify-content: center;
    flex-wrap: wrap;
}

.legend-item {
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 0.8rem;
    color: var(--md-default-fg-color--light);
}

.legend-dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
}

.legend-dot.gold { background: var(--accent-gold); }
.legend-dot.teal { background: var(--accent-teal); }

.last-updated {
    text-align: right;
    color: var(--md-default-fg-color--light);
    font-size: 0.75rem;
    margin-top: 12px;
}
</style>

<div class="grid cards" markdown>

-   :material-check-decagram: **Verified Users**

    ---

    <h2 style="margin: 0; font-family: monospace;"><span id="verifiedToday">—</span> / <span id="verifiedAll">—</span></h2>
    Today / All Time

-   :material-email-fast: **Emails Processed**

    ---

    <h2 style="margin: 0; font-family: monospace;"><span id="emailsToday">—</span> / <span id="emailsAll">—</span></h2>
    Today / All Time

</div>

<div class="controls">
    <button class="control-btn active" data-days="7">7 Days</button>
    <button class="control-btn" data-days="14">14 Days</button>
    <button class="control-btn" data-days="30">30 Days</button>
    <button class="control-btn" data-days="90">90 Days</button>
</div>

<div class="chart-section">
    <div class="chart-title">📊 Daily Activity</div>
    <div class="chart-wrapper">
        <canvas id="dailyChart"></canvas>
    </div>
    <div class="legend">
        <div class="legend-item"><span class="legend-dot gold"></span> Users Verified</div>
        <div class="legend-item"><span class="legend-dot teal"></span> Emails Sent</div>
    </div>
</div>

<div class="chart-section">
    <div class="chart-title">📉 Verification Rate</div>
    <div class="chart-wrapper">
        <canvas id="verificationRateChart"></canvas>
    </div>
    <div class="legend">
        <div class="legend-item"><span class="legend-dot gold"></span> Verified / Emails Sent (%)</div>
    </div>
</div>

<div class="chart-section">
    <div class="chart-title">📈 Total Users Verified</div>
    <div class="chart-wrapper">
        <canvas id="verifiedTotalChart"></canvas>
    </div>
</div>

<div class="chart-section">
    <div class="chart-title">✉️ Total Emails Sent</div>
    <div class="chart-wrapper">
        <canvas id="emailsTotalChart"></canvas>
    </div>
</div>

<div class="last-updated">Last updated: <span id="lastUpdated">-</span></div>

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script>
const API_BASE = 'https://jbcemail.alwaysdata.net';

const baseOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        mode: 'index',
        intersect: false
    },
    plugins: {
        legend: {
            display: false
        }
    },
    scales: {
        x: {
            grid: {
                color: 'rgba(0, 0, 0, 0.06)'
            },
            ticks: {
                color: '#6b7280'
            }
        },
        y: {
            beginAtZero: true,
            grid: {
                color: 'rgba(0, 0, 0, 0.06)'
            },
            ticks: {
                color: '#6b7280',
                precision: 0
            }
        }
    }
};

const autoScaleOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
        mode: 'index',
        intersect: false
    },
    plugins: {
        legend: {
            display: false
        }
    },
    scales: {
        x: {
            grid: {
                color: 'rgba(0, 0, 0, 0.06)'
            },
            ticks: {
                color: '#6b7280'
            }
        },
        y: {
            grid: {
                color: 'rgba(0, 0, 0, 0.06)'
            },
            ticks: {
                color: '#6b7280',
                precision: 0
            }
        }
    }
};

let dailyChart, verificationRateChart, verifiedTotalChart, emailsTotalChart;
let currentDays = 7;

function formatNumber(num) {
    if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
    if (num >= 10000) return (num / 1000).toFixed(1) + 'K';
    return num.toString();
}

function formatDate(dateStr) {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

async function fetchCurrentStats() {
    try {
        const res = await fetch(`${API_BASE}/stats/current`);
        const data = await res.json();
        
        document.getElementById('verifiedToday').textContent = formatNumber(data.usersVerifiedToday);
        document.getElementById('verifiedAll').textContent = formatNumber(data.usersVerifiedAll);
        document.getElementById('emailsToday').textContent = formatNumber(data.mailsSendToday);
        document.getElementById('emailsAll').textContent = formatNumber(data.mailsSendAll);
        document.getElementById('lastUpdated').textContent = new Date().toLocaleTimeString();
    } catch (err) {
        console.error('Failed to fetch current stats:', err);
    }
}

async function fetchHistoryStats(days) {
    try {
        const res = await fetch(`${API_BASE}/stats/history?days=${days}`);
        return await res.json();
    } catch (err) {
        console.error('Failed to fetch history:', err);
        return [];
    }
}

function createDataset(data, color, label) {
    return {
        label: label,
        data: data,
        borderColor: color,
        backgroundColor: color.replace('1)', '0.1)'),
        borderWidth: 2,
        fill: true,
        tension: 0.3,
        pointRadius: 3,
        pointHoverRadius: 6
    };
}

async function updateCharts(days) {
    const history = await fetchHistoryStats(days);
    
    if (history.length === 0) return;
    
    const labels = history.map(h => formatDate(h.date));
    const verifiedDaily = history.map(h => h.usersVerifiedToday);
    const emailsDaily = history.map(h => h.mailsSendToday);
    const verifiedTotal = history.map(h => h.usersVerifiedAll);
    const emailsTotal = history.map(h => h.mailsSendAll);
    
    // Destroy existing charts
    if (dailyChart) dailyChart.destroy();
    if (verificationRateChart) verificationRateChart.destroy();
    if (verifiedTotalChart) verifiedTotalChart.destroy();
    if (emailsTotalChart) emailsTotalChart.destroy();
    
    // Daily Activity Chart
    dailyChart = new Chart(document.getElementById('dailyChart'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                createDataset(verifiedDaily, 'rgba(212, 148, 10, 1)', 'Users Verified'),
                createDataset(emailsDaily, 'rgba(13, 148, 136, 1)', 'Emails Sent')
            ]
        },
        options: baseOptions
    });
    
    // Verification Rate Chart
    const verificationRate = history.map(h => {
        if (h.mailsSendToday === 0) return 0;
        return Math.min(((h.usersVerifiedToday / h.mailsSendToday) * 100), 100);
    });
    
    verificationRateChart = new Chart(document.getElementById('verificationRateChart'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                createDataset(verificationRate, 'rgba(212, 148, 10, 1)', 'Verification Rate (%)')
            ]
        },
        options: {
            ...baseOptions,
            scales: {
                ...baseOptions.scales,
                y: {
                    ...baseOptions.scales.y,
                    beginAtZero: true,
                    max: 100,
                    ticks: {
                        ...baseOptions.scales.y.ticks,
                        callback: function(value) { return value + '%'; }
                    }
                }
            },
            plugins: {
                ...baseOptions.plugins,
                tooltip: {
                    callbacks: {
                        label: function(context) {
                            return context.dataset.label + ': ' + context.parsed.y.toFixed(1) + '%';
                        }
                    }
                }
            }
        }
    });
    
    // Total Users Verified Chart (auto-scale, not starting at 0)
    verifiedTotalChart = new Chart(document.getElementById('verifiedTotalChart'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                createDataset(verifiedTotal, 'rgba(212, 148, 10, 1)', 'Total Verified')
            ]
        },
        options: autoScaleOptions
    });
    
    // Total Emails Sent Chart (auto-scale, not starting at 0)
    emailsTotalChart = new Chart(document.getElementById('emailsTotalChart'), {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                createDataset(emailsTotal, 'rgba(13, 148, 136, 1)', 'Total Emails')
            ]
        },
        options: autoScaleOptions
    });
}

// Control buttons
document.querySelectorAll('.control-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.control-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentDays = parseInt(this.dataset.days);
        updateCharts(currentDays);
    });
});

// Initial load
fetchCurrentStats();
updateCharts(currentDays);

// Auto-refresh every 30 seconds
setInterval(fetchCurrentStats, 30000);
</script>
