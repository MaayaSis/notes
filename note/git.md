# 基本概念

1. svn(集中式):svn每次存的都是差异,需要的硬盘空间会相对的小一点,可是回滚的速度会很慢
   - 优点:代码存放在单一的服务器上,便于项目的管理
   - 缺点:服务器宕机,员工写的代码得不到保障
   - 缺点:服务器崩溃,整个项目的历史记录都会丢失
2. git(分布式):每次存的都是项目的完整快照和索引,需要的硬盘空间会相对大一点
   - 优点:完全的分布式
   - 缺点:学习起来比SVN陡峭

# 简介&安装

参考收藏夹Function.Git安装教程

```javascript
git -version//查看版本
```

```javascript
git config --global user.name "Maaya"//设置提交代码者的用户名
git config --global user.email 877097131@qq.com//设置邮箱
```

```javascript
git config --list//查看当前git的一些信息,例如用户名
```

三个级别:从config开始向上查找

1. --system:应用到当前系统的配置
2. --global:应用到当前用户的配置
3. 什么都不加:应用到当前项目的配置

```javascript
git config --system user.name "Maaya"
git config --global user.name "Maaya"
git config user.name "Maaya"
```

# linux基本命令

**区域:**

1. **工作区:存代码的(沙箱)**
2. **暂存区:不可能修改一个文件,Git就修改一个版本,所以代码的修改先记录在暂存区,等到确定没问题再将暂存区的文件提交到工作区**
3. **版本库:这一系列的操作添加到版本库**

**对象:新建的文件夹并不是仓库,需要通过初始化后才是**

```javascript
git init
```

.git目录:

1. hooks:目录包含客户端或服务端的钩子脚本
2. info:包含一个全局性排除文件
3. logs:保存日志信息
4. objects:目录存储所有数据内容
5. refs:目录存储指向数据的提交对象的指针(分支)
6. config:文件包含项目特有的配置选项
7. description:用来显示对仓库的描述信息
8. HEAD:文件指示目前被检出的分支
9. index:文件保存暂存区信息

```bash
#基础的linux命令 
clear#清除
echo#相当于console.log,往控制台输出信息
echo "Maaya content" > Maaya.txt#创建txt文件,Maaya contant是里面的内容
ll#将当前目录下的 子文件&子目录平铺在控制台
find 目录名#将对应目录下的子孙文件&子孙目录平铺在控制台
find 目录名 -type f#将对应目录下的文件平铺在控制台,没有目录
rm 文件名#删除文件
mv 源文件 重命名文件#重命名
cat 文件的url#查看对应文件的内容
```

```bash
vim 文件的url(输入法在英文模式下)
i#进插入模式进行文件的编辑 
按esc键&按`:`键#退出编辑,并可以执行以下命令
q!#强制退出（不保存）
wq#保存退出
set nu#设置显示命令的行号
```

# Git对象

**Git对象:文件或者内容都会以hash-object的形式存入Git对象中,类型则是blob**

1. **将"test"存入数据库中,并返回此内容对应的哈希值,如果不`-w`则只返回哈希值,而不讲对应的内容存入数据库,-stdin则是自动存入objects文件夹下**
2. **返回的哈希值的前两位作为文件名objects文件夹下新建一个文件夹,而"test"就存在这个文件夹下**
3. **不加-stdin,则要填入一个路径**

```bash
echo "testcontent" | git hash-object -w -stdin
```

```bash
#通过哈希值去拉取对应的内容
git cat-file -p 5f3ad14dee633a758d2e331151e950dd13e4ed
```

```bash
#将Maaya.txt文件的内容存入数据库,文件名并不会被保存
#通过修改已存入objects的文件,它在objects中的哈希不会呗改变,需要重新提交改文件才可以
git hash-object -w ./Maaya.txt
vim ./Maaya.txt
git hash-object -w ./Maaya.txt
```

# 树对象

**树对象:解决文件名保存的问题，也允许我们将多个文件组织到一起**

**-add:因为此前该文件并不在暂存区中,首次需要—add** 

**--cacheinfo:因为将要添加的Git对象位于Git数据库中，而不是位于当前目录下,所以需要—cacheinfo** 

**终极理解:Git对象是文件的一个个版本,树对象是项目的一个个版本**

```bash
#创建一个文件
echo "Maaya.txt version" > Maaya.txt
git hash-object -w ./Maaya.txt#在工作区创建git对象,可以获得一个哈希值
#在暂存区创建一个树对象
git update-index --add --cacheinfo 100644 83baae61804e65cc73a7201a72527500 test.txt
#将暂存区的树对象,做一个快照存放到版本库
git write-tree#返回一个哈希值
git cat-file -t 83baae61804e65cc73a7201a72527500#查看该哈希值的类型,返回tree

get ls-files -s#产看暂存区中的内容,并不会因为树已经添加到工作区而消失
```

```bash
cat Maaya.txt#查看Maaya.txt的内容
vim Maaya.txt#给Maaya.txt添加新的内容
git hash-object -w Maaya.txt#给新得Maaya.txt文件生成一个git对象
#可以将上面[5]创造的树对象的test.txt的哈希给覆盖掉,而且这里不用加--add
git update-index --cacheinfo 100644 83baae61804e65cc73a7201a72527500 test.txt

echo "new.txt" > 
```

# 提交对象

```bash
#第一个树对象加入第二个树对象,使其成为新的树对象,使其分叉
git read-tree --prefix=bak d8329fc1cc938780ffdd9f94e0d364e0ea74f579 
git write-tree
```

提交对象:

1. 就是给树对象做一个包括,即该树对象的作者,邮箱等内容提交进去

1. 除了第一个提交对象之外,后面的每个提交对象提交时都要加上它的父提交对象

```bash
echo 'first commit' | git commit-tree d8329f#会返回一个提交对象的哈希,并创建它的名字使first...
echo 'second commit' | git commit-tree 0155eb -p fdf4fc3#-p是加上它的父对象哈希
```

# 高层命令1

Git操作的基本流程:

1. 创建工作目录,对工作目录进行修改
2. `git add ./`
3. `git commit -m "注释的内容"`

```bash
echo "姐姐" > sister.txt
git add ./#将当前路径的文件丢到暂存区和版本库
```

```bash
git commit -m "这是项目的第一个文件,作者:时间:"/#提交树对象,并添加注释
```

# 高层命令2

工作目录中的文件只有两种状态:已跟踪和未跟踪

1. 已跟踪的文件是指本来就被纳入版本控制管理的文件，在上次快照中有它们的记录,工作一段时间后，它们的状态可能是已提交，已修改或者已暂存
2. 所有其他文件都属于未跟踪文件,它们既没有上次更新时的快照,也不在当前的暂存区域

```bash
git status#确定文路径的文件当前处于什么状态
```

跟踪新文件(暂存):如果是目录的话,就说明要递归跟踪该目录下的所有文件

```bash
git add 文件夹名(文件名)#出现changes to be committed则表示已暂存
```

 **查看已暂存和未暂存的更新:**

```bash
#查看当前做的哪些更新还没有暂存
git diff
#查看哪些更新已经暂存起来准备好了下次提交
git diff –cached#&git diff –staged(1.6.1 以上)
```

提交当前路径下的暂存所有文件:

```bash
git commit#此高层命令是进入vim编写环境写入更多注释
```

跳过使用暂存区域:可以自动把所有已经跟踪过的文件暂存起来一并提交

```bash
git commit -a#对与已暂存过的文件进行修改后,可以直接使用该命令直接提交
```

**移除文件:将工作区的文件删除,是新生成一个树对象和提交对象**

**文件改名:相当于下面的操作**

```bash
mv Maaya.txt maaya.txt
 
git add maaya.txt
```

查看日志:

```bash
git log
git log --pretty=oneline#简写
git log --oneline#更简写
```

# 高层命令3

删除文件:

```bash
git rm maaya.txt#直接记录已删除的文件
git commit -m "maaya.txt"
```

重命名:

```bash
git mv maaya.txt siter.txt#
git commit -m "sister.txt"
```

# 高层命令4

创建分支:

```bash
git branch name#name是分支的名字
```

切换分支:

```bash
git checkout name#切换到指定分支
```

显示分支:

```bash
git branch#查看所有分支
```

删除分支:

```bash
git checkout master#切换到主分支
git branch -D name#会提示当前分支已被修改,但未合并,是否要确认删除
git branch -D name#强制删除已修改,但未合并的分支
```

查看当前分支最后一次提交的提交对象:

```bash
git branch -v
```

新建一个分支,并且指定这个分支指向的提交对象

```bash
git branch name hash0101010101#将新建分支跳转到任意历史版本
```

# 复习&命令汇总

## **底层命令:**

```bash
#git对象
git hash-object -w fileUrl#生成一个key(hash值):val(压缩后的文件内容)键值对存
```

```bash
#tree对象
git update-index --add --cacheinfo 100644 hash test.txt#往暂存区添加一条记录(让git对象,对应 上文件名)存到.git/index
git write-tree#生成树对象存到.git/objects
```

```bash
#commit对象
echo 'first commit' | git commit-tree treehash#生成一个提交对象存到.git/objects
```

```bash
#对以上对象的查询
git cat-file -p hash#拿对应对象的内容
git cat-file -t hash#拿对应对象的类型
```

```bash
git ls-files -s#查看暂存区内容
```

## **高层命令:**

```bash
git --version#查看版本
```

```bash
git config --global user.name "damu"#设置全局用户名(和当前分支?)
git config --global user.email damu@example.com#设置全局用户名和邮箱 
git config --list
```

```bash
git init#初始化仓库
```

```bash
#在工作目录中新增与修改文件(C&U)
git status
git add name(url)
git commit -m "msg"
```

```bash
#在工作目录删除与重命名文件(D&U)
git rm name#删除
git mv oldname name#重命名
```

```bash
#查询
git status#查看工作目录中文件的状态(已跟踪(已提交 已暂存 已修改) 未跟踪)
git diff#查看未暂存的修改
git diff --cache#查看未提交的暂存
git log --oneline#查看提交记录
```

```bash
#分支:分支的本质其实就是一个提交对象
#HEAD:是一个指针,它默认指向master分支,切换分支时其实就是让HEAD指向不同的分支
#每次有新的提交时,HEAD都会带着当前指向的分支,一起往前移动
git log --oneline --decorate --graph --all#查看整个项目的分支图
git branch#查看分支列表
git branch -v#查看分支指向的最新的提交
git branch name#在当前提交对象上创建新的分支
git branch name commithash#在指定的提交对象上创建新的分支
git checkout name#切换分支
git branch -d name#删除空的分支,删除已经被合并的分支
git branch -D name#强制删除分支,已修改但未合并的分支 
```

**自定义命令替换原命令:看视频**

# 分支实战1

## 理论

```bash
git checkout -b name#创建新的分支,并且切换过去
```

**切换分支(重要):**

1. **每次都会改变:1)HEAD,2)暂存区,3)工作目录**
2. **最佳实践:每次切换分之前,当前分支一定得是干净的(处于已提交状态)**

**分支污染(重要):在切换分支时,如果当前分支上有未暂存的修改,跟踪未暂存(第一次)或者有未提交的暂存(第一次)**

```bash
git init 
git checkout -b test#切换到test分支
echo "Maaya" > maaya.txt#创建一个文件,但有跟踪未暂存(第一次)或者有未提交的暂存(第一次),并切换了分支
git checkout master#切换到主分支后,maaya.txt仍在master上存在
git checkout test#maaya.txt也会在test分支上出现
```

## 实际案例

1. 开发某个网站
2. 为实现某个新的需求,创建一个分支
3. 在这个分支上开展工作,此时,突然接到一个电话说有个很严重的问题需要紧急修补

按照如下方式来处理：

1. 切换到你的线上分支（production branch）
2. 为这个紧急任务新建一个分支,并在其中修复它
3. 在测试通过之后,切换回线上分支,然后合并这个修补分支,最后将改动推送到线上分支。
4. 切换回你最初工作的分支上，继续工作

```bash
git init 
echo "test" > test.txt#创建test.txt
git add ./
git commit -a -m "1 commit master"

git status
git checkout -b iss53
echo "iss53 50%" > 53.txt
git add ./
git commit -m "1 commit iss53 50%"

git log --oneline --decorate --graph --all
git status
git checkout master
git checkout -b hotbug#修改bug
vim test.txt#打开test.txt并作出修改
git add ./ 
git commit -m "2 commit master merge"
```

# 分支实战2

```bash
#hotbug:快进合并(fast-forward),不会冲突
git status 
git checkout master#切换到master分支
git merge hotbug#合并
git branch -d hotbug#hotbug用完之后,删除
```

```bash
#iss53:经典合并,有可能导致冲突
git status
git checkout iss53#切换iss53
vim test.txt#打开test.txt并作出修改
git commit -a -m "3 commit iss53 100% merge to maste"
git checkout master
git merge iss53#iss53中没有hotbug修改过test.txt的记录,导致冲突
#conflict merge
vim test.txt#手动进行冲突修改
git add ./ 
git commit -m "4 commit master patch to test.txt"
git branch -d iss53#iss53用完之后,删除
```

# 分支实战3

**分支本质:**

1. **Git的分支,其实本质上仅仅是指向提交对象的可变指针**
2. **查看分支的文件可以发现里面储存的就是一串哈希值**

# Git存储

```bash
git stash #将未完成的修改保存到一个栈上,栈:先进后出
git checkout master
git checkout maaya
git stash list
git stash apply#而你可以在任何时候重新应用这些改动
git stash drop stash@{0}#[1]保存后的名字
```

```bash
#上面的简写
git stash
git checkout master
git checkout maaya
git stash list 
git stash pop
```

配别名(重要):每个公司的别名命名规则都可能不同

```bash
git config --global alias.co checkout
git config --global alias.br branch 
```

# Git后悔药 

```bash
#Git后悔药
vim maaya.txt
git add maaya.txt
git commit -m "1 commit"
#提交对象级撤回:17:git后悔药1[3]
git reset HEAD#放弃暂存区的修改,本质是使HEAD指向
git reset HEAD maaya.txt#暂存区级撤回
git checkout maaya.txt#对已在版本库,但又未追踪的文件修改的撤销
git reflog#查看所有的历史操作,包括不可见的
```

# Git后悔药1

`git commit -amend`(重要):使用后,最终你只会有一个提交,第二次提交将代替第一次提交的内容与注释

```bash
git commit -m "2 commit"
git add ./
git commit -amend#可以修改最近一次提交的内容与注释,即提交对像级撤回
```

# Git后悔药(reset)

## reset

`git log`:只产看当前HEAD所在分支的历史变动

`git reflog`(重要):只要HEAD有变化,那么`git reflog`就会记录下来

```bash
#1.1
git init
ehco "maaya" > maaya.txt
git add ./
git commit -m "1 commit"
vim maaya.txt
git commit -a -m "2 commit"
vim maaya.txt
git commit -a -m "3 commit"
```

`git reset --soft HEAD~`:只带着HEAD一起移动(可以理解为:只带着提交对象回退),保留暂存区和工作目录

```bash
#1.2:不确定是--soft还是-soft
git reset -soft HEAD~#HEAD numHASH || HEAD~:回到上一次提交的版本,~~代表回到上上次
git cat-file -p HEAD#查看回退后HEAD指向的提交对象的hash中包含的treeHash
git cat-file -p treeHash#获得tree对象中git对象的hash
git cat-file -p githash#即获得当前HEAD中的maaya.txt的内容

git cat-file -p maaya.txt#获得当前暂存区的内容
#对比[13],[15]发现[15]中的maaya.txt和[7]修改后的一样,[13]的则和[5]中的一样
```

`git .reset --mixed  HEAD~`:只带着HEAD和暂存区移动

```bash
#1.3
git reset --mixed HEAD~#和上面[1]一样,但不同的是会将暂存区也回退,但工作目录不变
```

1. **`git reset --hard  HEAD~`(这是个危险命令):**
   1. **带着全部移动,可能会将工作目录中已修改未生成git对象的文件删除**
   2. **他不像checkout一样,即使切换分支也会保留已修改当未生成git对象的**
2. **路径reset:使用路径命令,rese将会跳过第一步,即不改变HEAD,只回退暂存区中filename文件到上一个版本**

```bash
#[--mixed]是可以不用写的,相比1.3[2]中连HEAD~都不用写,因为这一步会被跳过
git reset [--mixed] filename#参考16:后悔药[5]
```

## checkout

```bash
git checkout -- filename#提交对象,暂存区不变跳过;只修改工作目录
```

```bash
git checkout commitHash filename#跳过提交对象;修改回退暂存区和工作目录
```

# Git完结

Git数据恢复:少用硬重置,多用分支

```bash
#1.1
git reflog#可以看到所有提交过的版本的哈希
#然后再通过reset恢复数据
```

```bash
#通过新建分支恢复数据
git checkout recover-branch commitHash#
```

Tag:给每次提交的版本打上标签,Git主要使用两种类型的标签,**标签本质上是一个固定的无法改动的版本**

1. 轻量标签
2. 重量标签

```bash
git tag#查看所有标签
git -l v1.8.5*#最后的版本相当于一个正则
```

```bash
git tag commithash v1.0#创建标签
git tag v1.1#不加commithash则默认打在最新的提交上
```

```bash
git show tagname#查看特定标签
```

```bash
git tag -d tagname#删除标签
```

```bash
git checkout tagname#检出标签:查看某个标签指向地文件版本
git checkout -b "v1.0 commit"
```

git特点:

1. 直接记录快照,而非差异比较
2. 近乎所有操作都是本地执行
3. 时刻保持数据完整性
4. 文件的三种状态:已修改,已暂存,已提交

# ESlint&哈士奇

ESlint:代码检查工具,使用npm安装,具体参考视频

# Git复习

**分支本质是一个提交对象,所有的分支都会有机会被HEAD所引用(HEAD一个时刻只会指向一个分支)**
**当我们有新的提交的时候,HEAD会携带当前持有的分支往前移动**

```bash
#21.1
git branch branchname#创建分支
git checkout  branchname#切换分支
git checkout -b branchname#创建&切换分支
git branch branchname commitHash#版本穿梭(时光机)
git branch -d branchname#普通删除分支
git branch -D branchname#强制删除分支
git merge branchname#合并分支
#快进合并>不会产生冲突
#典型合并>有可能产生冲突
#解决冲突>打开冲突的文件,进行修改,追踪,提交
```

```bash
#21.2
git branch#查看分支列表
git branch --merged#查看已合并到当前分支的分支列表,一旦出现在这个列表中,就应该删除
git branch --no-merged#查看没有合并到当前分支的分支列表,出现在这个列表中的分支要观察一下是否需要合并
```

git分支的注意点:在切换分支的时候,一定要保证当前分支是干净的(重要)

1. **允许切换:**
   - **分支上所有的内容处于 已提交状态**
   - **(避免)分支上的内容是初始化创建,处于未跟踪状态**
   - **(避免)分支上的内容是初始化创建,第一次处于已暂存状态**
2. **不允许切分支:分支上所有的内容处于,已修改,或第二次以后的已暂存状态**

```bash
#21.3:在分支上的工作未完成,又需要切换分支,我们应该将现有的工作存储起来
git stash#将当前分支上推到一个栈中(栈:先进后出)
#分支切换,进行其他工作,完成其他工作后,切回原分支
git stash apply#将栈顶的工作内容还原,但不让任何内容出栈 
git stash drop#取出栈顶的工作内容后 就应该将其删除(出栈)
git stash pop#[4][5]的结合
git stash list#查看存储
```

```bash
#21.4:后悔药
git checkout -- filename#撤销工作目录的修改
git reset HEAD  filename#撤销暂存区的修改
git commit --amend#撤销提交
```

```bash
#21.5:reset
git reset --soft commithash#用commithash的内容重置HEAD内容
git reset [--mixed] commithash#用commithash的内容重置HEAD内容;重置暂存区
git reset --hard commithash#用commithash的内容重置HEAD内容;重置暂存区;重置工作目录
```

路径reset:所有的路径reset都要省略第一步

1. 第一步:重置HEAD内容,我们知道HEAD本质指向一个分支,分支的本质是一个提交对象 
2. 提交对象指向一个树对象
3. 树对象又很有可能指向多个git对象
4. 一个git对象代表一个文件
5. HEAD可以代表一系列文件的状态

```bash
#21.6:路径reset
git reset commitHash filename#只有21.5[3]存在路径reset
```

checkout深入理解:

1. 共同:都需要重置HEAD;暂存区;工作目录
2. 区别
   1. `checkout`对工作目录是安全的
   2. `reset --hard`是强制覆盖
   3. `checkout`动HEAD时不会带着分支走而是切换分支
   4. `reset --hard`时是带着分支走

```bash
#21.7:相似的两条命令
git checkout brancname
git reset --hard commithash
```

```bash
#21.8:checkout+路径
git checkout commithash filename#重置暂存区;工作目录
git checkout -- filename#重置工作目录  
```

# ESlint复习

ESlint:是JavaScript代码的检查工具

```terminal
#22.1:ESlint
#下载:npm i eslint -D
#生成配置文件:npx eslint --init
#检查JS文件:npx eslint directoryName
```

```bash
#22.2:eslint需要结合git_husky(哈士奇)
#husky(哈士奇):为Git仓库设置钩子程序
#使用:
#		1)在仓库初始化完毕之后,再去安装哈士奇
#		2)在package.json中写入配置
#		3)配置参考视频22:前一天复习(7min)
```

# 团队协作

远程库

- 项目经理创建远程仓库:在GitHub创建本地库
- 项目经理创建本地库:在本地创建文件夹
- 项目经理为远程仓库配置别名

```bash
git remote -v#显示远程仓库使用的Git别名与其对应的URL
git remote add remote url#配置项目别名和url
git init#初始化仓库,或者将源码复制进来
git config --global user.name "Maaya"#设置项目经理的用户名
git config --global user.email 877097131@qq.com#设置邮箱
git add ./ 
git commit
```

- 项目经理推送到本地项目到远程仓库

```bash
git push remote branchname
```

- 成员克隆远程仓库到本地

```bash
git clone url#默认在克隆后,会为从远程分支下载下的mastre分支配备一个远程跟踪分支
git config --global user.name "Maaya"#设置成员的用户名
git config --global user.email 877097131@qq.com#设置邮箱
git config --global  --unset user.name
git config --global  --unset user.email#取消配置
```

- 项目经理邀请成员加入团队
- 成员推送提交到远程仓库

```bash
git remote -v#查看成员的仓库别名
git push remote branchname
```

- 项目经理更新成员提交的内容

```bash
git fetch remote#先将成员更新的内容同步远程跟踪分支
git merge remote/branchname#将远程跟踪分支上的内容合并到本地master分支上
```

# 远程跟踪分支

1. 远程分支
2. 远程跟踪分支:是远程分支状态的引用,他们是你不能移动的本地分支,当你做任何网络通信操作时,他们会自动移动
3. 本地分支

```bash
#项目经理的本地库
git fetch remote#获取所有成员提交的分支(?)
git checkout -branch devFornws#创建一个分支,用来获取成员上传到云端的远程分支
git merge taobao/deFornws#合并远程跟踪分支
```

```bash
git checkout master
git push#成员上只有本地master才可以通过此方法直接提交
git push orign branchname#其它分支要加上别名和分支名
git branch -u shrotname/baranchname#在非master分支的其它分支上时,通过此命令对当前分支创建远程跟踪分支
git push#此时当前分支可以直接推送
```

# 远程跟踪分支1

本地分支跟踪远程跟踪分支:

- 当克隆的时候,会自动生成一个origin/master的本地分支,它已经跟踪了对应的远程跟踪分支
- 在新建其它分支时,可以指定想要跟踪的远程跟踪分支

```bash
git checkout -b 本地分支名 远程跟踪分支名
git checkout --track 远程跟踪分支名#此时创建的本地分支名和远程跟踪分支名相同
```

- 将一个已经存在的本地分支改成一个跟踪分支

```bash
git branch -u 远程跟踪分支名
```

```bash
git branch -vv#查看设置的所有跟踪分支
```

```bash
#当每个本地分支都绑定了远程跟踪分支,那么就可以通过两条简单的命名上传下载修改
git push#上传
git pull#下载
```

# 解决冲突

典型合并的时候:本地操作会产生冲突

Pull,Push:可能导致远程协助的冲突

```bash
#clone repository 1
git init 
git remote -v 
git remote url#不设置别名,则默认别名origin
git config --global user.name "Maaya"
git config --global user.email 877097131@qq.com
git checkout -b "maaya"
echo "maaya.txt" > maaya.txt
git add ./
git commit -m "1 commit"
git push remote maaya#已经在GitHub仓库创建了一个远程分支,但是本地分支还没有跟踪远程跟踪分支
```

```bash
#clone repository 2
git init 
git remote -v 
git remote remote url
git config --global user.name "sister"
git config --global user.email 2307341136@qq.com
git fetch test#先获取成员修改过后仓库的所有数据到跟踪分支
git checkout -track origin/maaya
git pull#拉取跟踪分支
```

```bash
#远程Push协助冲突
#clone repository 1
vim maaya.txt#修改了吗maaya.txt的内容
git add ./
git commit -m "1"
git push
#clone repository 2
vim maaya.txt#克隆库2也修改了从克隆库1上传的远程分支中下载下来的maaya.txt
git add ./
git commit -m "2"
git push#再未跟新的情况下直接上传,导致冲突无法上传,report error
```

```bash
#远程Pull冲突
#clone r1 
vim maaya.txt#库1改maaya
...
git push
#clone r2
vim maaya.txt#库2改maaya
git pull#冲突
```

# Pull request

```bash
git push origin --delete serverfix#删除远程分支
git remote prune origin --dry-run#列出仍在远程跟踪但是远程已被删除的无用分支
git remote prune origin#清除上面命令列出来的远程跟踪
```

**当想要参与某个项目,但是并没有推送权限:通过Fork参与**

# 完结

对象:

1. git对象
2. 树对象
3. 提交对象

区域:

1. 本地文件
2. 暂存区
3. 版本库

分支:

1. 本地分支
2. 远程跟踪分支(remote/branch)
3. 远程分支

远程协作的基本流程:

1. 项目创建一个空的远程仓库
2. 项目经理创建一个待推送的本地仓库
3. 为远程仓库配别名,用户名,邮箱
4. 在本地仓库中初始化代码,提交本地代码
5. 推送到远程仓库
6. 邀请成员
7. 成员克隆远程仓库到本地
8. 成员做出修改
9. 成员推送自己的修改
10. 项目经理拉去成员的修改

```bash
git push remote branchname#推送,未绑定远程跟踪分支时
git push#推送,已绑定远程跟踪分支
git pull#拉取到远程跟踪分支
git checkout -u branchname#创建一个分支来合并新的代码
git fetch 别名#合并远程跟踪分支
```

```bash
#跟踪
#克隆远程库时,会自动未master做跟踪
#本地没有分支
git checkout --track remote/branchname
#本地有分支
git checkout -u barnchname
```

**`.gitignore`:此文件中所包含的文件类型的文件,都不会上传的git库中**