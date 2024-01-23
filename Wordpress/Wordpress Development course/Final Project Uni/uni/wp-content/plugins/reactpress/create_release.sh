rm -r /tmp/reactpress-svn
mkdir -p /tmp/reactpress-svn/tags/2.1.3
cp -r ./ /tmp/reactpress-svn/tags/2.1.3/
rm /tmp/reactpress-svn/tags/2.1.3/.gitignore
rm -rf /tmp/reactpress-svn/tags/2.1.3/.git
rm -r /tmp/reactpress-svn/tags/2.1.3/.vscode
rm -r /tmp/reactpress-svn/tags/2.1.3/assets
rm /tmp/reactpress-svn/tags/2.1.3/admin/js/reactpress-admin/*
rm /tmp/reactpress-svn/tags/2.1.3/admin/js/reactpress-admin/.gitignore
rm -r /tmp/reactpress-svn/tags/2.1.3/admin/js/reactpress-admin/node_modules
rm -r /tmp/reactpress-svn/tags/2.1.3/admin/js/reactpress-admin/src
rm -r /tmp/reactpress-svn/tags/2.1.3/admin/js/reactpress-admin/public
rm -rf /tmp/reactpress-svn/tags/2.1.3/admin/js/reactpress-admin/.git
rm -r /tmp/reactpress-svn/trunk
cp -r /tmp/reactpress-svn/tags/2.1.3/ /tmp/reactpress-svn/
mv /tmp/reactpress-svn/2.1.3 /tmp/reactpress-svn/trunk
