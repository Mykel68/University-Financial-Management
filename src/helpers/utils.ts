export const getRoleLabel = (role: string) => {
  switch (role) {
    case "system_admin":
      return "System Administrator";
    case "finance_officer":
      return "Finance Officer";
    case "department_head":
      return "Department Head";
    default:
      return role;
  }
};

export const getRoleBadgeVariant = (role: string) => {
  switch (role) {
    case "system_admin":
      return "destructive";
    case "finance_officer":
      return "default";
    case "department_head":
      return "secondary";
    default:
      return "secondary";
  }
};

export const getInitials = (name: string) => {
  const firstName = name.split(" ")[0];
  const lastName = name.split(" ")[1];
  return firstName.charAt(0) + lastName.charAt(0);
};
