class RemoveGroupsIdFromGroups < ActiveRecord::Migration[5.2]
  def change
    remove_column :groups, :group_id, :integer
  end
end
