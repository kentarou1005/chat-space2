# DB設計

## usersテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false, index: true|
|email|integer|null: false|
|password|integer|null: false|

### Association
- has_many :user_groups
- has_many :groups, through: :user_groups
- has_many :messages

### groupsテーブル

|Column|Type|Options|
|------|----|-------|
|name|string|null: false|

### Association
- has_many :user_groups
- has_many :users, through: :user_groups
- has_many :messages

## user_groupsテーブル

|Column|Type|Options|
|------|----|-------|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign_key: true|

### Association
- belongs_to :user
- belongs_to :group

## messagesテーブル
|Column|Type|Options|
|------|----|-------|
|body|text|
|image|string|
|user|references|null: false, foreign_key: true|
|group|references|null: false, foreign: true|

### Association
- belongs_to :user
- belongs_to :group