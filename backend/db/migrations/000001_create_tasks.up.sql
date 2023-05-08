CREATE TABLE IF NOT EXISTS `tasks` (
  `id` int(11) UNSIGNED NOT NULL AUTO_INCREMENT COMMENT 'タスクID',
  `title` varchar(100) NOT NULL COMMENT 'タスク名',
  `content` text NOT NULL COMMENT 'タスク内容',
  `schedule` datetime NOT NULL COMMENT '予定日',
  `done` tinyint(1) NOT NULL DEFAULT 0 COMMENT '完了フラグ',
  `created_at` datetime NOT NULL COMMENT '作成日時',
  `updated_at` datetime NOT NULL COMMENT '更新日時',
  PRIMARY KEY (`id`)
) ENGINE = InnoDB DEFAULT CHARSET = utf8mb4 COMMENT 'タスク';
