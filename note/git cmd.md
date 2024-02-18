# 初始化

1. `git config --global user.name`:配置用户名
2. `git config --global user.email`:配置用户邮箱
3. `git remote add <name> <url> `关联一个远程仓库,并为它设置别名字

# 常用

1. `git init`:初始化
2. `git add ./`:暂存修改
3. `git commit -m ''`:提交修改
4. `git push origin/master`:推送到远程分支`master`
5. `git pull origin/master`:从远程分支`master`拉取
6. `git config --list`:查看配

# 回退

1. `git checkout .`:回退所有未暂存的本地更改
2. `git checkout - fileName`:回退指定未暂存的本地更改文件
3. `git reset HEAD`:回退到上一个头部,放弃已暂存未提交时使用,但本地修改仍然存在
5. `git reset --hard headHash`:回退到指定的提交
6. `git reset --hard commit`:回退到任意版本
7. `git reflog`:可以查看所有头部的`hash`

# 分支

1. `git branch`:查看本地分支
2. `git remote -vv`:查看远程分支情况
3. `git branch -a`:查看所有分支
4. `git branch -vv`:查看本地分支与远程分支的关联情况
5. `git push origin --delete branchName`:删除远程分支
6. `git branch -d branchName`:删除本地分支,但在删除前会检查上游分支,无条件删除则使用`-D`
7. `git branch --set-upstream origin branchName`本地分支关联远程分支
8. `git checkout --track <origin/branchName>`:创建的本地分支名和远程跟踪分支名相同

# 提交信息修改

1. `git rebase -i HEAD~1`:合并多个`commit`
   1. 执行以上命令后进入`vim`,将要合并`commit`的状态修改为`s`
   2. `git push -f`:在保证不会覆盖别人代码的情况下不`git pull`直接强制推送

# 理解

1. 关于`https`和`ssh`
   1. `https`:团队开发中,不给成员账号,将无法直接`push`到仓库中,只能请求->允许完成一次合并;或者给每个开发者的`git`账号权限,以允许不经审查直接推送
   2. `ssh`:相当于`https`的账号

