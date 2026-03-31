/**
 * Progress Tracker for YJ商城 Development Plan
 * Simple JavaScript implementation
 */

const fs = require('fs');
const path = require('path');

const PROGRESS_FILE = path.join(__dirname, 'progress.json');

// Task definitions
const TASK_DEFINITIONS = {
  // Phase 1
  '1.1': '初始化项目结构',
  '1.2': '数据库设计',
  '1.3': '基础设施模块',
  '1.4': '验证标准',

  // Phase 2
  '2.1': '用户认证 (Auth Module)',
  '2.2': '用户中心 (Users Module)',

  // Phase 3
  '3.1': '商品分类 (Categories Module)',
  '3.2': '商品模块 (Products Module)',
  '3.3': '商品评价 (Reviews Module)',

  // Phase 4
  '4.1': '购物车 (Cart Module)',
  '4.2': '订单 (Orders Module)',
  '4.3': '支付 (Payments Module)',
  '4.4': '物流 (Logistics Module)',

  // Phase 5
  '5.1': '优惠券 (Coupons Module)',
  '5.2': '活动 (Activities Module)',

  // Phase 6
  '6.1': '商家模块 (Shops Module)',
  '6.2': '商家商品管理',
  '6.3': '商家订单管理',

  // Phase 7
  '7.1': '商家售后管理',
  '7.2': '商家客服',
  '7.3': '商家财务',

  // Phase 8
  '8.1': '运营用户管理',
  '8.2': '运营商家管理',
  '8.3': '运营类目管理',
  '8.4': '运营商品审核',
  '8.5': '运营活动管理',
  '8.6': '运营优惠券管理',
  '8.7': '运营广告管理',
  '8.8': '运营数据报表',
  '8.9': '运营系统设置',

  // Phase 9
  '9.1': '消息通知',
  '9.2': '文件存储',
  '9.3': '定时任务',
  '9.4': '监控日志'
};

// Milestone definitions
const MILESTONES = {
  mvp: ['1.1', '1.2', '1.3', '1.4', '2.1', '2.2', '3.1', '3.2', '3.3'],
  coreTrading: ['4.1', '4.2', '4.3', '4.4', '5.1', '5.2'],
  merchantBackend: ['6.1', '6.2', '6.3', '7.1', '7.2', '7.3'],
  operatorBackend: ['8.1', '8.2', '8.3', '8.4', '8.5', '8.6', '8.7', '8.8', '8.9']
};

function loadProgress() {
  if (!fs.existsSync(PROGRESS_FILE)) {
    const defaultData = {
      version: '1.0',
      lastUpdated: new Date().toISOString(),
      tasks: {},
      milestones: {
        mvp: false,
        coreTrading: false,
        merchantBackend: false,
        operatorBackend: false
      }
    };
    for (const key of Object.keys(TASK_DEFINITIONS)) {
      defaultData.tasks[key] = { completed: false };
    }
    return defaultData;
  }
  const data = JSON.parse(fs.readFileSync(PROGRESS_FILE, 'utf-8'));
  return data;
}

function saveProgress(data) {
  data.lastUpdated = new Date().toISOString();
  fs.writeFileSync(PROGRESS_FILE, JSON.stringify(data, null, 2));
}

function checkMilestones(data) {
  data.milestones.mvp = MILESTONES.mvp.every(task => data.tasks[task]?.completed);
  data.milestones.coreTrading = MILESTONES.coreTrading.every(task => data.tasks[task]?.completed);
  data.milestones.merchantBackend = MILESTONES.merchantBackend.every(task => data.tasks[task]?.completed);
  data.milestones.operatorBackend = MILESTONES.operatorBackend.every(task => data.tasks[task]?.completed);
}

function getPhaseName(phaseNum) {
  const phases = {
    1: '项目基础设施搭建',
    2: 'C端用户模块',
    3: 'C端商品模块',
    4: 'C端购物车与订单模块',
    5: 'C端营销模块',
    6: 'B端商家后台 - 商品与订单',
    7: 'B端商家后台 - 售后与客服',
    8: 'B端运营后台',
    9: '平台基础设施'
  };
  return phases[phaseNum] || `Phase ${phaseNum}`;
}

function showProgress() {
  const data = loadProgress();
  const lines = [];

  lines.push('# YJ商城 开发进度\n');
  lines.push(`最后更新: ${data.lastUpdated}\n`);
  lines.push('## 里程碑\n');
  lines.push(`- [${data.milestones.mvp ? 'x' : ' '}] MVP版本 (第1-2周): 基础设施 + 用户模块 + 商品模块`);
  lines.push(`- [${data.milestones.coreTrading ? 'x' : ' '}] 核心交易 (第3-4周): 购物车 + 订单 + 营销`);
  lines.push(`- [${data.milestones.merchantBackend ? 'x' : ' '}] 商家后台 (第5-6周): 商品管理 + 订单处理 + 售后客服`);
  lines.push(`- [${data.milestones.operatorBackend ? 'x' : ' '}] 运营后台 (第7-8周): 运营功能 + 基础设施\n`);

  // Group tasks by phase
  const phases = {};
  for (const [key, name] of Object.entries(TASK_DEFINITIONS)) {
    const phaseNum = parseInt(key.split('.')[0]);
    if (!phases[phaseNum]) {
      phases[phaseNum] = [];
    }
    phases[phaseNum].push(key);
  }

  // Calculate overall progress
  const totalTasks = Object.keys(TASK_DEFINITIONS).length;
  const completedTasks = Object.values(data.tasks).filter(t => t.completed).length;
  const progressPercent = ((completedTasks / totalTasks) * 100).toFixed(1);

  lines.push(`## 总体进度: ${completedTasks}/${totalTasks} (${progressPercent}%)\n`);

  // Output each phase
  const sortedPhases = Object.keys(phases).sort((a, b) => parseInt(a) - parseInt(b));
  for (const phaseNumStr of sortedPhases) {
    const phaseNum = parseInt(phaseNumStr);
    lines.push(`## 阶段${phaseNum}: ${getPhaseName(phaseNum)}\n`);

    const sortedTasks = phases[phaseNum].sort();
    for (const taskKey of sortedTasks) {
      const task = data.tasks[taskKey];
      const name = TASK_DEFINITIONS[taskKey];
      const status = task?.completed ? 'x' : ' ';
      const completedAt = task?.completedAt ? ` (${task.completedAt.split('T')[0]})` : '';
      lines.push(`- [${status}] ${taskKey} ${name}${completedAt}`);
    }
    lines.push('');
  }

  return lines.join('\n');
}

function markTask(taskId) {
  if (!TASK_DEFINITIONS[taskId]) {
    return {
      success: false,
      message: `未知任务ID: ${taskId}\n\n可用任务ID:\n${Object.keys(TASK_DEFINITIONS).join(', ')}`
    };
  }

  const data = loadProgress();

  if (data.tasks[taskId]?.completed) {
    return {
      success: true,
      message: `任务 ${taskId} (${TASK_DEFINITIONS[taskId]}) 已经标记为完成`
    };
  }

  data.tasks[taskId] = {
    completed: true,
    completedAt: new Date().toISOString()
  };

  checkMilestones(data);
  saveProgress(data);

  const totalTasks = Object.keys(TASK_DEFINITIONS).length;
  const completedTasks = Object.values(data.tasks).filter(t => t.completed).length;
  const progressPercent = ((completedTasks / totalTasks) * 100).toFixed(1);

  let response = `✓ 已标记完成: ${taskId} ${TASK_DEFINITIONS[taskId]}\n\n`;
  response += `当前进度: ${completedTasks}/${totalTasks} (${progressPercent}%)\n`;

  const milestoneNames = {
    mvp: '🎉 MVP版本里程碑达成! (第1-2周)',
    coreTrading: '🎉 核心交易里程碑达成! (第3-4周)',
    merchantBackend: '🎉 商家后台里程碑达成! (第5-6周)',
    operatorBackend: '🎉 运营后台里程碑达成! (第7-8周)'
  };

  for (const [key, name] of Object.entries(milestoneNames)) {
    if (data.milestones[key]) {
      response += `\n${name}`;
    }
  }

  return { success: true, message: response };
}

function unmarkTask(taskId) {
  if (!TASK_DEFINITIONS[taskId]) {
    return {
      success: false,
      message: `未知任务ID: ${taskId}`
    };
  }

  const data = loadProgress();

  if (!data.tasks[taskId]?.completed) {
    return {
      success: true,
      message: `任务 ${taskId} (${TASK_DEFINITIONS[taskId]}) 已经是未完成状态`
    };
  }

  data.tasks[taskId] = {
    completed: false
  };

  checkMilestones(data);
  saveProgress(data);

  const totalTasks = Object.keys(TASK_DEFINITIONS).length;
  const completedTasks = Object.values(data.tasks).filter(t => t.completed).length;
  const progressPercent = ((completedTasks / totalTasks) * 100).toFixed(1);

  return {
    success: true,
    message: `○ 已取消完成: ${taskId} ${TASK_DEFINITIONS[taskId]}\n当前进度: ${completedTasks}/${totalTasks} (${progressPercent}%)`
  };
}

function resetProgress() {
  const defaultData = {
    version: '1.0',
    lastUpdated: new Date().toISOString(),
    tasks: {},
    milestones: {
      mvp: false,
      coreTrading: false,
      merchantBackend: false,
      operatorBackend: false
    }
  };

  for (const key of Object.keys(TASK_DEFINITIONS)) {
    defaultData.tasks[key] = { completed: false };
  }

  saveProgress(defaultData);

  return {
    success: true,
    message: '已重置所有进度'
  };
}

// CLI interface
const args = process.argv.slice(2);
const command = args[0];

switch (command) {
  case 'show':
    console.log(showProgress());
    break;
  case 'mark':
    if (!args[1]) {
      console.log('Usage: node progress-tracker.js mark <task-id>');
      console.log('Example: node progress-tracker.js mark 1.1');
    } else {
      const result = markTask(args[1]);
      console.log(result.message);
    }
    break;
  case 'unmark':
    if (!args[1]) {
      console.log('Usage: node progress-tracker.js unmark <task-id>');
    } else {
      const result = unmarkTask(args[1]);
      console.log(result.message);
    }
    break;
  case 'reset':
    const result = resetProgress();
    console.log(result.message);
    break;
  case 'list':
    console.log('可用任务ID:');
    for (const [key, name] of Object.entries(TASK_DEFINITIONS)) {
      console.log(`  ${key}: ${name}`);
    }
    break;
  default:
    console.log(showProgress());
}
