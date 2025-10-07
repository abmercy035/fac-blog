import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Shield, Edit, Eye, Users, FileText, MessageSquare } from "lucide-react"

export function RolePermissionsInfo() {
  const roles = [
    {
      name: "Admin",
      icon: Shield,
      variant: "default" as const,
      description: "Full system access with all permissions",
      permissions: [
        "Manage all posts and comments",
        "Create, edit, and delete any content",
        "Manage user accounts and roles",
        "Access admin dashboard",
        "View analytics and reports",
        "System configuration",
      ],
    },
    {
      name: "Editor",
      icon: Edit,
      variant: "secondary" as const,
      description: "Content creation and management permissions",
      permissions: [
        "Create and edit own posts",
        "Access editor interface",
        "Manage own content",
        "Upload media files",
        "Preview unpublished content",
      ],
    },
    {
      name: "Viewer",
      icon: Eye,
      variant: "outline" as const,
      description: "Read-only access to published content",
      permissions: ["View published posts", "Read comments", "Access public pages", "No editing permissions"],
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-2">Role Permissions</h2>
        <p className="text-muted-foreground">
          Understanding the different user roles and their permissions in the system.
        </p>
      </div>

      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-3">
        {roles.map((role) => {
          const Icon = role.icon
          return (
            <Card key={role.name}>
              <CardHeader>
                <div className="flex items-center space-x-2">
                  <Icon className="h-5 w-5" />
                  <CardTitle>{role.name}</CardTitle>
                  <Badge variant={role.variant}>{role.name}</Badge>
                </div>
                <CardDescription>{role.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {role.permissions.map((permission, index) => (
                    <li key={index} className="flex items-start space-x-2 text-sm">
                      <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <span>{permission}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center">
            <Users className="h-5 w-5 mr-2" />
            Permission Matrix
          </CardTitle>
          <CardDescription>Quick reference for what each role can access</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left py-2 pr-4">Feature</th>
                  <th className="text-center py-2 px-2">Admin</th>
                  <th className="text-center py-2 px-2">Editor</th>
                  <th className="text-center py-2 px-2">Viewer</th>
                </tr>
              </thead>
              <tbody className="space-y-2">
                <tr className="border-b">
                  <td className="py-2 pr-4 flex items-center">
                    <FileText className="h-4 w-4 mr-2" />
                    Manage Posts
                  </td>
                  <td className="text-center py-2 px-2">✅</td>
                  <td className="text-center py-2 px-2">Own only</td>
                  <td className="text-center py-2 px-2">❌</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pr-4 flex items-center">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Manage Comments
                  </td>
                  <td className="text-center py-2 px-2">✅</td>
                  <td className="text-center py-2 px-2">❌</td>
                  <td className="text-center py-2 px-2">❌</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2 pr-4 flex items-center">
                    <Users className="h-4 w-4 mr-2" />
                    Manage Users
                  </td>
                  <td className="text-center py-2 px-2">✅</td>
                  <td className="text-center py-2 px-2">❌</td>
                  <td className="text-center py-2 px-2">❌</td>
                </tr>
                <tr>
                  <td className="py-2 pr-4 flex items-center">
                    <Shield className="h-4 w-4 mr-2" />
                    Admin Dashboard
                  </td>
                  <td className="text-center py-2 px-2">✅</td>
                  <td className="text-center py-2 px-2">❌</td>
                  <td className="text-center py-2 px-2">❌</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
