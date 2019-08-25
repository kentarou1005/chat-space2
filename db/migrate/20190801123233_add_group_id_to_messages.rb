class AddGroupIdToMessages < ActiveRecord::Migration[5.2]
  def change
    add_column :messages, :group_id, :integer
  end
end
