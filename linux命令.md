## 快速提交 
```
git commit -a -m'备注'   只能提交已经加入过一次缓存区的文件
```
## 查看git状态
```
git status 可以查看当前工作区状态
```

## git的对比
- git diff 工作区和暂存区
- git diff 分支名(master) 工作区和离市区
- git diff --cached 暂存区和历史区比较

## 撤销
- 从暂存区中将工作区内容覆盖掉
```
git checkout 文件名
git rest HEAD 文件名 回到上一次的缓存区
```

## 回滚历史版本
```
git reset --hard 版本号  回退从历史区的某个版本,工作区和暂存区都会被覆盖
git reset --hard head^   回退到历史区的上一个版本,工作区和暂存区都会被覆盖
git reflog 查看所有版本
git log 查看当前版本之前的版本
```

## 创建分支和查看有哪些分支
```
git branch (这后面如果加了名字就是创建分支,不加名称就是查看有哪些分支)
```

## 切换分支
```
git checkout 分支名
```
## 删除分支
```
git branch -D 分支名
```
> 删除分支时当前用户不能再当前要删除的分支上

## 创建并切换分支
```
git checkout -b dev
```
> 添加文件到历史区,此时两个分支就没关系了

## 文件修改切换分支

```
git stash 暂存文件
git stash pop 还原暂存的内容
```
> 分支有更改不能直接切换,可以提交更改或者暂存更改,暂存使用过度区覆盖掉工作区

## 合并分支
```
git merge 分支名
```
## echo输入文件内容
```
echo '内容' > 1.txt  
echo '内容' >> 1.txt
```
> 一个 > 表示输入,会把原来的内容覆盖掉
> 两个 > 表示追加,会在原来的内容的基础上追加内容

## linux命令
- pwd print working directory 打印工作目录
- rm -rf 文件夹 删除文件
- rm 文件名 删除文件
- mkdir 文件夹名字 创建目录
- cd 目录名 change directory
- ls -al显示目录下所有的文件
- touch 1.txt  摸一下,创建文件
- cat 文件名 查看文件内容

