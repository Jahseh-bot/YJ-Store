module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',     // 新功能
        'fix',      // 修复bug
        'docs',     // 文档变更
        'style',    // 代码格式(不影响代码运行的变动)
        'refactor', // 重构(既不是新增功能也不是修复bug)
        'perf',     // 性能优化
        'test',     // 测试
        'build',    // 构建相关
        'ci',       // CI配置
        'chore',    // 其他变更
        'revert',   // 回滚
        'wip',      // 开发中
        'workflow'  // 工作流
      ]
    ],
    'subject-full-stop': [0, 'never'],
    'subject-case': [0, 'never']
  }
}
