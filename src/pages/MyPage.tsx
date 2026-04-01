import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { tools } from "@/data/mockData";
import { User, Settings, Package, Trash2, Save, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const MyPage = () => {
  const { user, signOut, updateName } = useAuth();
  const navigate = useNavigate();

  const [name, setName] = useState(user?.name || "");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(false);

  // Mock: user's submitted tools (use localStorage)
  const [submittedToolIds] = useState<string[]>(() => {
    const stored = localStorage.getItem("localtools-submitted");
    return stored ? JSON.parse(stored) : ["squoosh", "excalidraw"];
  });

  const submittedTools = tools.filter((t) => submittedToolIds.includes(t.id));

  if (!user) {
    navigate("/login");
    return null;
  }

  const handleSaveName = () => {
    if (!name.trim()) return;
    updateName(name.trim());
    toast.success("이름이 변경되었습니다.");
  };

  const handleChangePassword = (e: React.FormEvent) => {
    e.preventDefault();
    if (!currentPassword || !newPassword) return;
    if (newPassword !== confirmPassword) {
      toast.error("새 비밀번호가 일치하지 않습니다.");
      return;
    }
    if (newPassword.length < 6) {
      toast.error("비밀번호는 6자 이상이어야 합니다.");
      return;
    }
    toast.success("비밀번호가 변경되었습니다.");
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
  };

  const handleDeleteAccount = () => {
    localStorage.removeItem("localtools-user");
    localStorage.removeItem("localtools-submitted");
    signOut();
    toast.success("계정이 삭제되었습니다.");
    navigate("/");
  };

  return (
    <Layout>
      <div className="container mx-auto max-w-4xl px-4 py-10">
        {/* Profile header */}
        <div className="mb-8 flex items-center gap-4">
          <img
            src={`https://api.dicebear.com/9.x/thumbs/svg?seed=${encodeURIComponent(user.email)}`}
            alt="avatar"
            className="h-16 w-16 rounded-full border-2 border-border"
          />
          <div>
            <h1 className="font-heading text-2xl font-bold text-foreground">{user.name}</h1>
            <p className="text-sm text-muted-foreground">{user.email}</p>
          </div>
        </div>

        <Tabs defaultValue="submissions" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="submissions" className="gap-2">
              <Package className="h-4 w-4" />
              내 등록 툴
            </TabsTrigger>
            <TabsTrigger value="settings" className="gap-2">
              <Settings className="h-4 w-4" />
              설정
            </TabsTrigger>
          </TabsList>

          {/* ── My Submissions ── */}
          <TabsContent value="submissions">
            {submittedTools.length === 0 ? (
              <Card>
                <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
                  <Package className="h-12 w-12 text-muted-foreground/40" />
                  <div>
                    <p className="font-medium text-foreground">등록한 툴이 없습니다</p>
                    <p className="mt-1 text-sm text-muted-foreground">새로운 브라우저 기반 툴을 등록해보세요.</p>
                  </div>
                  <Button asChild>
                    <Link to="/submit">툴 등록하기</Link>
                  </Button>
                </CardContent>
              </Card>
            ) : (
              <div className="grid gap-4 sm:grid-cols-2">
                {submittedTools.map((tool) => (
                  <Card key={tool.id} className="group transition-shadow hover:shadow-md">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3">
                          {tool.icon ? (
                            <img src={tool.icon} alt="" className="h-10 w-10 rounded-lg" />
                          ) : (
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-lg font-bold text-primary">
                              {tool.name[0]}
                            </div>
                          )}
                          <div>
                            <CardTitle className="text-base">{tool.name}</CardTitle>
                            <CardDescription className="text-xs">{tool.siteName}</CardDescription>
                          </div>
                        </div>
                        <Link
                          to={`/tool/${tool.id}`}
                          className="text-muted-foreground opacity-0 transition-opacity group-hover:opacity-100"
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Link>
                      </div>
                    </CardHeader>
                    <CardContent className="pt-0">
                      <p className="line-clamp-2 text-sm text-muted-foreground">{tool.tagline}</p>
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {tool.categories.map((c, i) => (
                          <span
                            key={i}
                            className="rounded-full bg-accent px-2 py-0.5 text-xs text-accent-foreground"
                          >
                            {c.secondary}
                          </span>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          {/* ── Settings ── */}
          <TabsContent value="settings" className="space-y-6">
            {/* Name */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg">
                  <User className="h-5 w-5" />
                  이름 변경
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="display-name">표시 이름</Label>
                  <Input
                    id="display-name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="mt-1.5 max-w-sm"
                  />
                </div>
                <Button onClick={handleSaveName} size="sm" className="gap-2">
                  <Save className="h-4 w-4" />
                  저장
                </Button>
              </CardContent>
            </Card>

            {/* Password */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">비밀번호 변경</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleChangePassword} className="space-y-4">
                  <div>
                    <Label htmlFor="current-pw">현재 비밀번호</Label>
                    <Input
                      id="current-pw"
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      className="mt-1.5 max-w-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="new-pw">새 비밀번호</Label>
                    <Input
                      id="new-pw"
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      className="mt-1.5 max-w-sm"
                    />
                  </div>
                  <div>
                    <Label htmlFor="confirm-pw">새 비밀번호 확인</Label>
                    <Input
                      id="confirm-pw"
                      type="password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="mt-1.5 max-w-sm"
                    />
                  </div>
                  <Button type="submit" size="sm">변경하기</Button>
                </form>
              </CardContent>
            </Card>

            {/* Email preferences */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">알림 설정</CardTitle>
                <CardDescription>이메일 알림 수신 여부를 설정합니다.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">정보성 메일 수신</p>
                    <p className="text-xs text-muted-foreground">새로운 기능, 업데이트 등의 소식을 받습니다.</p>
                  </div>
                  <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-foreground">주간 다이제스트</p>
                    <p className="text-xs text-muted-foreground">매주 인기 툴과 새 등록 툴을 요약해서 보내드립니다.</p>
                  </div>
                  <Switch checked={weeklyDigest} onCheckedChange={setWeeklyDigest} />
                </div>
              </CardContent>
            </Card>

            {/* Danger zone */}
            <Card className="border-destructive/30">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-lg text-destructive">
                  <Trash2 className="h-5 w-5" />
                  계정 삭제
                </CardTitle>
                <CardDescription>
                  계정을 삭제하면 모든 데이터가 영구적으로 삭제되며 복구할 수 없습니다.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" size="sm">계정 삭제</Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>정말 삭제하시겠습니까?</AlertDialogTitle>
                      <AlertDialogDescription>
                        이 작업은 되돌릴 수 없습니다. 등록한 툴, 리뷰 등 모든 데이터가 삭제됩니다.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>취소</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleDeleteAccount}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        삭제
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default MyPage;
