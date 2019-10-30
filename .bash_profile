#Show current git branch name on git initialized directory
function parse_git_branch () {
  git branch 2> /dev/null | sed -e '/^[^*]/d' -e 's/* \(.*\)/ (\1)/'
}
 
# \033[ or \e[ indicates the beginning of color promopt
RED="\[\e[0;31m\]"
YELLOW="\[\e[0;33m\]"
BLUE="\[\e[0;34m\]"
GREEN="\[\033[0;32m\]"
CYAN="\[\e[0;36m\]"
PURPLE="\[\e[0;35m\]"
BROWN="\[\e[0;33m\]"
NO_COLOR="\[\033[0m\]"
 
 
PS1="$BROWN\u@\h$NO_COLOR:\w$GREEN\$(parse_git_branch)$NO_COLOR\$ "
