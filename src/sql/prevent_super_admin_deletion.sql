-- Create a function that prevents deletion of the 'super_admin' role
CREATE OR REPLACE FUNCTION prevent_super_admin_deletion()
RETURNS TRIGGER AS $$
BEGIN
  IF OLD.role = 'super_admin' THEN
    RAISE EXCEPTION 'Cannot delete user with super_admin role.';
  END IF;
  RETURN OLD;
END;
$$ LANGUAGE plpgsql;

-- Attach the trigger to the users table
CREATE TRIGGER check_super_admin_deletion
BEFORE DELETE ON users
FOR EACH ROW EXECUTE FUNCTION prevent_super_admin_deletion();
