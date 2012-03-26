#!/usr/bin/perl -w -s
#
# Deploy web application. compress css and js files with YUI compressor, join js files to one single file

use strict;
use warnings;

use File::Basename;
use File::Path;
use File::Spec;

sub compressDir($$$)
{
	my $compressor = shift;
	my $compress_dir = shift;
	my $dest_dir = shift;

	my $tmp_file = File::Spec->catfile($compress_dir, 'tmp');

	opendir(DIRCOMPRESS, $compress_dir) || die "can't opendir $compress_dir: $!";
	foreach my $_compressed_file (grep {/\.(css|js)$/ && -f File::Spec->catfile($compress_dir, $_)} readdir(DIRCOMPRESS))
	{
		my $compressed_file = File::Spec->catfile($compress_dir, $_compressed_file);
		my $dest_file = File::Spec->catfile($dest_dir, $_compressed_file);

		print "Compressing ${compressed_file} to ${dest_file} ...\n";
		system("java -jar \"${compressor}\" --charset utf-8 -o \"$tmp_file\" \"${compressed_file}\"");

		rename $tmp_file, $dest_file;
	}
	closedir DIRCOMPRESS;
}

sub mergeDir($$)
{
	my $merged_dir = shift;
	my $final_name = shift;

	my $tmp_file = File::Spec->catfile($merged_dir, 'tmp');
	my $dest_file = File::Spec->catfile($merged_dir, $final_name);

	print "Merging ${merged_dir} ...\n";
	unlink $dest_file if -f $dest_file;
	system("cat \"${merged_dir}\"/*.js > \"$tmp_file\"");
	system("rm -f \"${merged_dir}\"/*.js");
	rename $tmp_file, $dest_file;
}

sub main()
{
	if (2 != @ARGV)
	{
		print "Usage:\t$0 source_folder dest_folder\n";
		exit;
	};

	my $source_dir = shift @ARGV;
	my $dest_dir = shift @ARGV;

	my $base_dir = dirname(File::Spec->rel2abs($0));
	my $compressor = File::Spec->catfile($base_dir, "yuicompressor-2.4.2.jar");

	print "svn export ...\n";
	system("svn export --force \"${source_dir}\" \"${dest_dir}\"");

	foreach my $_compress_dir ('_js', '_css', File::Spec->catfile('App', 'js'), File::Spec->catfile('AppUI', 'js'))
	{
		my $compress_dir = File::Spec->catfile($dest_dir, $_compress_dir);
		compressDir($compressor, $compress_dir, $compress_dir) if -d $compress_dir;
	}

	foreach my $_join_dir ('_js')
	{
		mergeDir(File::Spec->catfile($dest_dir, $_join_dir), "all.js");
	}
}

main();
