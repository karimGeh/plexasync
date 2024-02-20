CREATE OR REPLACE FUNCTION prevent_super_admin_role_update()
RETURNS TRIGGER AS $$
BEGIN
  -- Check if the role of the row being updated is 'super_admin'
  IF OLD.role = 'super_admin' THEN
    -- Check if the role is being attempted to change
    IF OLD.role IS DISTINCT FROM NEW.role THEN
      RAISE EXCEPTION 'Cannot change the role of the super_admin user.';
    END IF;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER prevent_super_admin_role_update_trigger
BEFORE UPDATE ON users
FOR EACH ROW EXECUTE FUNCTION prevent_super_admin_role_update();
